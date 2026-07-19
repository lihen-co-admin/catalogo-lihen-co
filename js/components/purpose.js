export function setupPurposeToggle() {
  const button = document.querySelector("[data-purpose-toggle]");
  const details = document.querySelector("[data-purpose-details]");
  if (!button || !details) return;
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
    details.hidden = open;
    button.textContent = open ? "Conocer nuestro propósito" : "Ocultar explicación";
  });
}
