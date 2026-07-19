export function setupAccordion() {
  document.querySelectorAll(".faq-item > button").forEach((button) =>
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    }),
  );
}
