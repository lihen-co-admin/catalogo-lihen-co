import { getPrimaryImage } from "../utils/formatters.js";
import {
  isProductSelected,
  toggleProductSelection,
} from "../state/productSelection.js";
export function createProductCard(product, onOpen) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.productId = product.id;
  const imageButton = document.createElement("button");
  imageButton.className = "product-card__image-button";
  imageButton.type = "button";
  imageButton.setAttribute("aria-label", `Ver producto ${product.name}`);
  const image = document.createElement("img");
  image.className = "product-card__image";
  image.src = getPrimaryImage(product);
  image.alt = `${product.name} de ${product.brand}`;
  image.loading = "lazy";
  image.width = 640;
  image.height = 640;
  imageButton.innerHTML = `<span class="product-card__tag">${product.tag || "Referencia en consulta"}</span>`;
  imageButton.append(image);
  if (product.images?.length > 1) {
    const n = document.createElement("span");
    n.className = "product-card__image-count";
    n.textContent = `▣ ${product.images.length}`;
    imageButton.append(n);
  }
  imageButton.addEventListener("click", () => onOpen(product));
  let hoverTimer,
    index = 0;
  const start = () => {
    if ((product.images?.length || 0) < 2) return;
    clearInterval(hoverTimer);
    hoverTimer = setInterval(() => {
      index = (index + 1) % product.images.length;
      image.style.opacity = ".15";
      setTimeout(() => {
        image.src = product.images[index];
        image.style.opacity = "1";
      }, 140);
    }, 1050);
  };
  const stop = () => {
    clearInterval(hoverTimer);
    index = 0;
    image.src = getPrimaryImage(product);
    image.style.opacity = "1";
  };
  article.addEventListener("mouseenter", start);
  article.addEventListener("mouseleave", stop);
  article.addEventListener("focusin", start);
  article.addEventListener("focusout", stop);
  const body = document.createElement("div");
  body.className = "product-card__body";
  body.innerHTML = `<div class="product-card__meta"><span>${product.line}</span><span>${product.category.split("/")[0]}</span></div><h3>${product.name}</h3><p class="product-card__brand">${product.brand} · ${product.category.split("/")[0]}</p><p class="product-card__category">${product.price}</p><div class="product-card__footer"><button class="button button-small button-secondary" type="button" data-open-product>Ver producto</button><button class="product-card__select" type="button" data-select-product>Agregar</button></div>`;
  const detail = body.querySelector("[data-open-product]"),
    select = body.querySelector("[data-select-product]");
  function update() {
    const selected = isProductSelected(product.id);
    article.classList.toggle("is-selected", selected);
    select.classList.toggle("is-selected", selected);
    select.setAttribute("aria-pressed", String(selected));
    select.textContent = selected ? "Agregado ✓" : "Agregar";
  }
  detail.addEventListener("click", () => onOpen(product));
  select.addEventListener("click", () => {
    toggleProductSelection(product.id);
    update();
  });
  update();
  article.append(imageButton, body);
  return article;
}
