import { products } from "../data/products.js";
import { createProductCard } from "../components/productCard.js";
import { createProductModal } from "../components/productModal.js";
import { formatProductCount } from "../utils/formatters.js";
import { subscribeToProductSelection } from "../state/productSelection.js";
import {
  CATALOG_CATEGORY_GROUPS,
  CATALOG_LINES,
  createCatalogState,
  filterCatalogProducts,
  getCatalogCategories,
} from "../catalog/catalogFilters.js";
import {
  setupCatalogCarousel,
  updateCatalogCarouselProgress,
} from "../catalog/catalogCarousel.js";

function populateCategorySelect(select) {
  if (!select) return;

  for (const category of getCatalogCategories(products)) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.append(option);
  }
}

function renderCategoryPills() {
  for (const [lineName, categories] of Object.entries(CATALOG_CATEGORY_GROUPS)) {
    const holder = document.querySelector(`[data-category-pills="${lineName}"]`);
    if (!holder) continue;

    holder.innerHTML = categories
      .map((category, index) =>
        `<button class="category-pill ${index === 0 ? "is-active" : ""}" type="button" data-catalog-category="${lineName}" data-value="${category}">${category}</button>`,
      )
      .join("");
  }
}

export function setupCatalog() {
  const search = document.querySelector("[data-product-search]");
  const select = document.querySelector("[data-category-filter]");
  const count = document.querySelector("[data-result-count]");
  const lineButtons = [...document.querySelectorAll("[data-line-filter]")];
  const modal = createProductModal();
  const state = createCatalogState();

  populateCategorySelect(select);
  renderCategoryPills();

  const filteredByLine = (lineName) => filterCatalogProducts(products, state, lineName);

  function renderLine(lineName) {
    const track = document.querySelector(`[data-product-carousel="${lineName}"]`);
    if (!track) return;

    const list = filteredByLine(lineName);
    track.replaceChildren(...list.map((product) => createProductCard(product, modal.open)));
    setupCatalogCarousel(track, lineName);
    updateCatalogCarouselProgress(track, lineName);
  }

  function render() {
    CATALOG_LINES.forEach(renderLine);
    const total = CATALOG_LINES.reduce((sum, lineName) => sum + filteredByLine(lineName).length, 0);
    if (count) count.textContent = formatProductCount(total);
  }

  search?.addEventListener("input", (event) => {
    state.query = event.target.value;
    render();
  });

  select?.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });

  lineButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.line = button.dataset.lineFilter;
      lineButtons.forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));

      if (state.line !== "Todos") {
        document
          .querySelector(state.line === "Style" ? "#style" : "#beauty-care")
          ?.scrollIntoView({ behavior: "smooth" });
      }

      render();
    });
  });

  document.querySelectorAll("[data-catalog-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const lineName = button.dataset.catalogCategory;
      state.lineCategories[lineName] = button.dataset.value;
      document
        .querySelectorAll(`[data-catalog-category="${lineName}"]`)
        .forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
      renderLine(lineName);
    });
  });

  subscribeToProductSelection(render);
  render();
}
