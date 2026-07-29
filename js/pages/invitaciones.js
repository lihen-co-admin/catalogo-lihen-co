import {
  confirmInvitation,
  findInvitationByCode
} from "../invitations/invitationRepository.js?v=181";
import {
  cleanInvitationName,
  matchesInvitationName,
  normalizeInvitationCode
} from "../invitations/invitationValidators.js?v=180";
import { createInvitationView } from "../invitations/invitationView.js?v=182";
import { createInvitationExperience } from "../invitations/invitationExperience.js?v=183";
import { createInvitationState } from "../invitations/invitationState.js?v=183";

const STARTUP_ERROR_MESSAGE =
  "No pudimos iniciar la invitación. Recarga la página con Ctrl + F5 y vuelve a intentarlo.";
const WHATSAPP = "573058947808";

function showStartupError(error) {
  console.error("[LIHEN Invitaciones] Error de inicio:", error);
  const output = document.querySelector("[data-form-message]");
  if (output) {
    output.textContent = STARTUP_ERROR_MESSAGE;
    output.className = "form-message error";
  }
}

function whatsappUrl(text) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function qrUrl(url) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(url)}`;
}

function initializeInvitationPage() {
  try {
    const state = createInvitationState();
    const view = createInvitationView({ qrUrl });
    const experience = createInvitationExperience({ view });
    const { message } = view;

    function responsibleName() {
      return state.invitation?.responsible || "LIHEN.CO";
    }

    function buildInitialWhatsappText() {
      return `Hola LIHEN.CO, soy ${state.invitation.display_name}. Deseo confirmar mi invitación a la inauguración. Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
    }

    function buildWhatsappText() {
      const modeText = {
        presencial: "confirmo mi asistencia presencial",
        virtual: "confirmo que deseo acompañarlos de forma virtual",
        no_asiste:
          "agradezco mi invitación y confirmo que en esta ocasión no podré acompañarlos"
      }[state.mode];
      const count =
        state.mode === "presencial"
          ? ` Asistiremos ${state.count} persona(s) en total.`
          : "";
      const virtual =
        state.mode === "virtual"
          ? " Comprendo que la plataforma y el enlace de transmisión se compartirán posteriormente, y estaré pendiente de las redes y del grupo de WhatsApp."
          : "";
      const absence =
        state.mode === "no_asiste"
          ? " Por favor, registren mi ausencia para organizar correctamente los cupos, actividades, premios, descuentos y beneficios destinados a los asistentes confirmados. Seguiré pendiente de las novedades y próximas oportunidades de LIHEN.CO."
          : "";

      return `Hola LIHEN.CO, soy ${state.invitation.display_name}. ${modeText}.${count}${virtual}${absence} Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
    }

    async function prepareInvitation(invitation) {
      state.setInvitation(invitation);
      view.renderInvitation(invitation, state.count);
      view.renderVirtualOnly(Boolean(invitation.virtual_only));
      view.updateTicketQr(whatsappUrl(buildInitialWhatsappText()));
      await experience.transitionToSeal();
    }

    async function handleDiscovery(event) {
      event?.preventDefault?.();
      const output = document.querySelector("[data-form-message]");
      const identityForm = document.querySelector("[data-identity-form]");
      const typedName = cleanInvitationName(
        identityForm?.elements?.guestName?.value
      );

      if (typedName.length < 2) {
        message(output, "Escribe tu nombre para continuar.", "error");
        return;
      }

      if (!state.urlCode) {
        message(
          output,
          "Este enlace no contiene una invitación válida. Solicita a la persona que te invitó que te reenvíe tu enlace personal.",
          "error"
        );
        return;
      }

      state.setTypedName(typedName);
      message(output, "Preparando tu experiencia…");

      try {
        const invitation = await findInvitationByCode(state.urlCode);
        if (!invitation) {
          throw new Error(
            "No encontramos una invitación asociada a este enlace."
          );
        }
        if (!matchesInvitationName(typedName, invitation)) {
          throw new Error(
            "Escribe tu nombre o tus nombres y primer apellido como aparecen en tu invitación."
          );
        }
        await prepareInvitation(invitation);
      } catch (error) {
        message(output, error.message, "error");
      }
    }

    function selectMode(mode) {
      if (mode === "presencial" && state.invitation?.virtual_only) {
        message(
          document.querySelector("[data-rsvp-message]"),
          "Esta invitación está habilitada únicamente para modalidad virtual o para registrar que no podrás acompañarnos.",
          "error"
        );
        return;
      }

      state.setMode(mode);
      if (mode !== "presencial") view.resetProtectedLocation();
      view.renderSelectedMode(mode);
      view.updateConfirmState(state.mode);
    }

    function bindIdentityControls() {
      const identityForm = document.querySelector("[data-identity-form]");
      identityForm?.addEventListener("submit", handleDiscovery);
      document
        .querySelector("[data-discover-button]")
        ?.addEventListener("click", handleDiscovery);
    }

    function bindInvitationControls() {
      document
        .querySelector("[data-open-invitation]")
        .addEventListener("click", (event) => {
          experience.revealInvitation(event.currentTarget);
        });

      document
        .querySelector("[data-location-locked]")
        ?.addEventListener("click", () => {
          view.toggleModeSection(true);
          message(
            document.querySelector("[data-rsvp-message]"),
            "Confirma asistencia presencial para revelar la dirección y el mapa."
          );
        });

      document
        .querySelector("[data-agenda-toggle]")
        .addEventListener("click", (event) => {
          view.toggleAgenda(event.currentTarget);
        });

      document.querySelectorAll("[data-mode-toggle]").forEach((button) => {
        button.addEventListener("click", () => view.toggleModeSection());
      });
      view.setModeToggleText(false);

      document.querySelectorAll("[data-mode]").forEach((button) => {
        button.addEventListener("click", () => {
          const mode = button.dataset.mode;
          if (mode === "virtual") {
            document.querySelector("[data-virtual-dialog]").showModal();
            return;
          }
          if (mode === "no_asiste") {
            document.querySelector("[data-no-attend-dialog]").showModal();
            return;
          }
          selectMode(mode);
        });
      });
    }

    function bindDialogControls() {
      const virtualAccept = document.querySelector("[data-virtual-accept]");
      const virtualConfirm = document.querySelector("[data-virtual-confirm]");
      const virtualDialog = document.querySelector("[data-virtual-dialog]");

      virtualAccept.addEventListener("change", () => {
        virtualConfirm.disabled = !virtualAccept.checked;
      });
      virtualDialog.addEventListener("close", (event) => {
        if (event.currentTarget.returnValue === "confirm") {
          selectMode("virtual");
        }
        virtualAccept.checked = false;
        virtualConfirm.disabled = true;
      });

      const noAttendAccept = document.querySelector("[data-no-attend-accept]");
      const noAttendConfirm = document.querySelector("[data-no-attend-confirm]");
      const noAttendDialog = document.querySelector("[data-no-attend-dialog]");

      noAttendAccept.addEventListener("change", () => {
        noAttendConfirm.disabled = !noAttendAccept.checked;
      });
      noAttendDialog.addEventListener("close", (event) => {
        if (event.currentTarget.returnValue === "confirm") {
          selectMode("no_asiste");
        }
        noAttendAccept.checked = false;
        noAttendConfirm.disabled = true;
      });
    }

    function bindConfirmationControls() {
      document
        .querySelector("[data-attendee-count]")
        .addEventListener("change", (event) => {
          state.setCount(event.target.value);
        });

      document
        .querySelector("[data-data-consent]")
        .addEventListener("change", () => {
          view.updateConfirmState(state.mode);
        });

      document
        .querySelector("[data-confirm]")
        .addEventListener("click", async () => {
          const output = document.querySelector("[data-rsvp-message]");
          const button = document.querySelector("[data-confirm]");
          button.disabled = true;
          message(output, "Guardando tu respuesta…");

          try {
            const result = await confirmInvitation({
              accessCode: state.invitation.access_code,
              mode: state.mode,
              attendees: state.count
            });

            if (state.mode === "presencial") {
              state.setLocation(
                view.revealProtectedLocation(result?.location, state.mode)
              );
            }

            message(
              output,
              state.mode === "presencial" && result?.location
                ? "Tu asistencia presencial quedó registrada. Ya puedes consultar la ubicación y confirmar desde WhatsApp."
                : "Tu respuesta quedó preparada. Confírmala desde tu WhatsApp.",
              "success"
            );
            view.revealWhatsapp(whatsappUrl(buildWhatsappText()));
          } catch (error) {
            message(output, error.message, "error");
            button.disabled = false;
          }
        });
    }

    state.setUrlCode(
      normalizeInvitationCode(
        new URLSearchParams(location.search).get("codigo")
      )
    );

    if (!state.urlCode) {
      message(
        document.querySelector("[data-form-message]"),
        "Abre el enlace personal que te envió Lizeth, Diana o Hellen.",
        "error"
      );
    }

    bindIdentityControls();
    bindInvitationControls();
    bindDialogControls();
    bindConfirmationControls();
    experience.bindSoundControls();

    window.__LIHEN_INVITACIONES_READY__ = true;
  } catch (error) {
    showStartupError(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeInvitationPage, {
    once: true
  });
} else {
  initializeInvitationPage();
}
