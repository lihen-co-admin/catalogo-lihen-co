export function createInvitationView({ qrUrl }) {
  const screens = Object.fromEntries(
    [...document.querySelectorAll("[data-screen]")].map((element) => [
      element.dataset.screen,
      element
    ])
  );
  const guestLabels = document.querySelectorAll("[data-guest-name]");
  const rsvpSection = document.getElementById("confirmacion");
  const modeToggleButtons = document.querySelectorAll("[data-mode-toggle]");

  function showScreen(name) {
    Object.entries(screens).forEach(([key, element]) => {
      const active = key === name;
      element.hidden = !active;
      element.classList.toggle("is-active", active);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function message(element, text, type = "") {
    if (!element) return;
    element.textContent = text;
    element.className = `form-message ${type}`.trim();
  }

  function renderInvitation(invitation, currentCount) {
    guestLabels.forEach((element) => {
      element.textContent = invitation.display_name;
    });

    const max = Math.max(
      currentCount,
      Number(invitation.max_attendees || 3)
    );
    document.querySelector("[data-max-attendees]").textContent = max;

    const select = document.querySelector("[data-attendee-count]");
    select.innerHTML = "";
    for (let count = currentCount; count <= max; count += 1) {
      const option = document.createElement("option");
      option.value = count;
      option.textContent = `${count} ${count === 1 ? "persona" : "personas"}`;
      select.append(option);
    }
    select.value = currentCount;
  }

  function renderVirtualOnly(virtualOnly) {
    const presencialButton = document.querySelector('[data-mode="presencial"]');
    const virtualNotice = document.querySelector("[data-virtual-only-notice]");

    if (presencialButton) {
      presencialButton.hidden = virtualOnly;
      presencialButton.disabled = virtualOnly;
      presencialButton.setAttribute("aria-disabled", String(virtualOnly));
    }
    if (virtualNotice) virtualNotice.hidden = !virtualOnly;
  }

  function updateTicketQr(url) {
    document.querySelector("[data-ticket-qr]").src = qrUrl(url);
  }

  function setModeToggleText(open) {
    modeToggleButtons.forEach((button) => {
      button.textContent = open ? "Ocultar modalidad" : "Elegir modalidad";
      button.setAttribute("aria-expanded", String(open));
    });
  }

  function toggleModeSection(forceOpen = null) {
    const willOpen = forceOpen === null ? rsvpSection.hidden : forceOpen;
    rsvpSection.hidden = !willOpen;
    setModeToggleText(willOpen);
    if (willOpen) {
      rsvpSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function renderSelectedMode(mode) {
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("selected", button.dataset.mode === mode);
    });
    document.querySelector("[data-attendance-box]").hidden = mode !== "presencial";
    document.querySelector("[data-whatsapp-panel]").hidden = true;
  }

  function updateConfirmState(mode) {
    const consent = document.querySelector("[data-data-consent]");
    document.querySelector("[data-confirm]").disabled = !(mode && consent.checked);
  }

  function revealProtectedLocation(locationData, mode) {
    if (!locationData || mode !== "presencial") return null;

    const address = String(locationData.address || "").trim();
    const mapsUrl = String(locationData.maps_url || "").trim();
    if (!address || !mapsUrl) return null;

    const summary = document.querySelector("[data-location-summary]");
    const locked = document.querySelector("[data-location-locked]");
    const link = document.querySelector("[data-location-link]");
    const notice = document.querySelector("[data-location-notice]");

    if (summary) summary.textContent = address;
    if (locked) locked.hidden = true;
    if (link) {
      link.href = mapsUrl;
      link.hidden = false;
    }
    if (notice) {
      notice.textContent = "Tu asistencia presencial quedó registrada. Ya puedes consultar la ubicación confirmada.";
    }

    return { address, maps_url: mapsUrl };
  }

  function resetProtectedLocation() {
    const summary = document.querySelector("[data-location-summary]");
    const locked = document.querySelector("[data-location-locked]");
    const link = document.querySelector("[data-location-link]");
    const notice = document.querySelector("[data-location-notice]");

    if (summary) {
      summary.textContent = "Se revelará únicamente después de confirmar asistencia presencial.";
    }
    if (locked) locked.hidden = false;
    if (link) {
      link.hidden = true;
      link.removeAttribute("href");
    }
    if (notice) {
      notice.textContent = "Por seguridad, la dirección y el acceso al mapa solo se mostrarán después de registrar una confirmación presencial.";
    }
  }

  function revealWhatsapp(url) {
    const link = document.querySelector("[data-whatsapp-link]");
    link.href = url;
    document.querySelector("[data-whatsapp-qr]").src = qrUrl(url);
    updateTicketQr(url);

    const panel = document.querySelector("[data-whatsapp-panel]");
    panel.hidden = false;
    panel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function updateSoundButtons(active) {
    document.querySelectorAll("[data-sound-toggle]").forEach((button) => {
      button.textContent = active ? "♫ Pausar ambiente" : "♫ Activar ambiente";
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function toggleAgenda(button) {
    const panel = document.querySelector("[data-agenda]");
    panel.hidden = !panel.hidden;
    button.textContent = panel.hidden ? "Ver programación" : "Ocultar programación";
  }

  return {
    screens,
    message,
    showScreen,
    renderInvitation,
    renderVirtualOnly,
    updateTicketQr,
    setModeToggleText,
    toggleModeSection,
    renderSelectedMode,
    updateConfirmState,
    revealProtectedLocation,
    resetProtectedLocation,
    revealWhatsapp,
    updateSoundButtons,
    toggleAgenda
  };
}
