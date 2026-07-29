const WHATSAPP_NUMBER = "573058947808";

function buildWelcomeMessage(formData) {
  const birthday = [formData.get("month"), formData.get("day"), formData.get("year")]
    .filter(Boolean)
    .join("/");

  return `Hola LIHEN.CO, deseo solicitar el beneficio de bienvenida. Correo: ${formData.get("email")}.${birthday ? ` Cumpleaños: ${birthday}.` : ""} Autorizo el contacto para conocer condiciones vigentes.`;
}

export function mountWelcomePromo() {
  if (document.querySelector("[data-welcome-tab]")) return;

  const host = document.createElement("div");
  host.innerHTML = `<div class="welcome-tab-wrap"><button class="welcome-tab" type="button" data-welcome-tab aria-label="Abrir beneficio de bienvenida"><span>10%</span><small>BIENVENIDA</small></button><button class="welcome-tab-close" type="button" data-welcome-tab-hide aria-label="Ocultar beneficio">×</button></div><div class="welcome-modal-backdrop" data-welcome-modal hidden><section class="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><button class="welcome-modal-close" type="button" data-welcome-close aria-label="Cerrar">×</button><div class="welcome-modal-copy"><p class="eyebrow">Beneficio LIHEN.CO</p><h2 id="welcome-title">Recibe un beneficio en tu primera compra.</h2><p>Déjanos tus datos para solicitar las condiciones vigentes de la campaña.</p><form data-welcome-form><label>Correo electrónico<input type="email" name="email" required placeholder="tu@correo.com"></label><fieldset><legend>Cumpleaños <small>(opcional)</small></legend><div class="birthday-fields"><input type="number" name="month" min="1" max="12" placeholder="MM" aria-label="Mes"><input type="number" name="day" min="1" max="31" placeholder="DD" aria-label="Día"><input type="number" name="year" min="1900" max="2026" placeholder="AAAA" aria-label="Año"></div></fieldset><label class="consent-check"><input type="checkbox" name="consent" required><span>Autorizo a LIHEN.CO a contactarme sobre este beneficio y acepto la <a href="./politica-de-privacidad.html">Política de privacidad</a>.</span></label><button class="btn btn-dark" type="submit">Solicitar beneficio</button><button class="welcome-no" type="button" data-welcome-close>Ahora no</button></form><small>El beneficio está sujeto a vigencia, productos participantes y demás condiciones informadas por LIHEN.CO.</small></div><div class="welcome-modal-art"><img src="./assets/banners/lihen_beneficio_bienvenida.webp" alt="Identidad visual de LIHEN.CO para el beneficio de bienvenida"></div></section></div>`;
  document.body.append(...host.children);

  const modal = document.querySelector("[data-welcome-modal]");
  if (!modal) return;

  const open = () => {
    modal.hidden = false;
    document.body.classList.add("no-scroll");
  };
  const close = () => {
    modal.hidden = true;
    document.body.classList.remove("no-scroll");
  };

  document.querySelector("[data-welcome-tab]")?.addEventListener("click", open);
  document.querySelector("[data-welcome-tab-hide]")?.addEventListener("click", (event) => {
    event.stopPropagation();
    document.querySelector(".welcome-tab-wrap")?.remove();
  });
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.closest("[data-welcome-close]")) close();
  });
  document.querySelector("[data-welcome-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildWelcomeMessage(new FormData(event.currentTarget));
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener",
    );
    close();
  });
}
