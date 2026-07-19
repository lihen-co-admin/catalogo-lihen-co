import { categories } from "../data/categories.js";
import { createCategoryCard } from "../components/categoryCard.js";
import { openWhatsApp } from "../services/whatsappService.js";

export function initializeHomePage() {
  renderCategories();
  initializeWhatsAppButton();
  updateCurrentYear();
}

function renderCategories() {
  const container = document.querySelector("[data-category-list]");

  if (!container) {
    return;
  }

  const fragment = document.createDocumentFragment();

  categories.forEach((category) => {
    fragment.append(createCategoryCard(category));
  });

  container.replaceChildren(fragment);
}

function initializeWhatsAppButton() {
  const button = document.querySelector("[data-whatsapp-button]");

  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    openWhatsApp("Hola LIHEN.CO, vengo de la página web y quiero consultar productos disponibles.");
  });
}

function updateCurrentYear() {
  const yearElement = document.querySelector("[data-current-year]");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}
