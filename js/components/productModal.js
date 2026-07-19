import { products } from "../data/products.js";
import {
  buildProductWhatsAppMessage,
  openWhatsApp,
} from "../services/whatsappService.js";
import {
  isProductSelected,
  setProductQuantity,
  getProductQuantity,
} from "../state/productSelection.js";
import { createProductCard } from "./productCard.js";
export function createProductModal() {
  const modal = document.querySelector("[data-product-modal]");
  if (!modal) return { open() {}, close() {} };
  const dialog = modal.querySelector(".product-modal__dialog"),
    mainImage = modal.querySelector("[data-modal-main-image]"),
    thumbs = modal.querySelector("[data-modal-thumbnails]"),
    counter = modal.querySelector("[data-modal-image-counter]"),
    title = modal.querySelector("[data-modal-title]"),
    brand = modal.querySelector("[data-modal-brand]"),
    category = modal.querySelector("[data-modal-category]"),
    description = modal.querySelector("[data-modal-description]"),
    details = modal.querySelector("[data-modal-details]"),
    breadcrumb = modal.querySelector("[data-modal-breadcrumb]"),
    price = modal.querySelector("[data-modal-price]"),
    whatsapp = modal.querySelector("[data-modal-whatsapp]"),
    select = modal.querySelector("[data-modal-select]"),
    prev = modal.querySelector("[data-modal-previous]"),
    next = modal.querySelector("[data-modal-next]"),
    qtyText = modal.querySelector("[data-modal-qty]"),
    related = modal.querySelector("[data-related-products]");
  let current = null,
    index = 0,
    qty = 1,
    previousFocus = null,
    relatedAuto = null;

  function setupAutoTrack(track) {
    if (!track) return;
    clearInterval(relatedAuto);
    let paused = false;
    const step = () => Math.max(220, track.clientWidth * 0.46);
    const tick = () => {
      if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (track.scrollWidth <= track.clientWidth + 10) return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 8) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: step(), behavior: "smooth" });
      }
    };
    relatedAuto = window.setInterval(tick, 4600);
    track.onmouseenter = () => (paused = true);
    track.onmouseleave = () => (paused = false);
    track.ontouchstart = () => (paused = true);
    track.ontouchend = () => setTimeout(() => (paused = false), 1800);
  }
  function gallery() {
    const imgs = current?.images || [];
    mainImage.src =
      imgs[index] || "./assets/images/lihen_logo_transparente.webp";
    mainImage.alt = `${current.name}, imagen ${index + 1}`;
    counter.textContent = `${index + 1} de ${Math.max(1, imgs.length)}`;
    prev.disabled = imgs.length <= 1;
    next.disabled = imgs.length <= 1;
    thumbs
      .querySelectorAll("button")
      .forEach((b, i) => b.classList.toggle("is-active", i === index));
  }
  function renderThumbs() {
    index = 0;
    thumbs.replaceChildren();
    (current.images || []).forEach((src, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "product-modal__thumbnail";
      b.innerHTML = `<img src="${src}" alt="">`;
      b.addEventListener("click", () => {
        index = i;
        gallery();
      });
      thumbs.append(b);
    });
    gallery();
  }
  function updateButton() {
    const selected = isProductSelected(current.id);
    select.textContent = selected
      ? "Actualizar mi selección"
      : "Agregar a mi selección";
    select.classList.toggle("is-selected", selected);
    qtyText.textContent = String(qty);
  }
  function renderRelated() {
    related.replaceChildren();
    products
      .filter(
        (p) =>
          p.id !== current.id &&
          (p.line === current.line || p.category === current.category),
      )
      .slice(0, 10)
      .forEach((p) => related.append(createProductCard(p, open)));
    related.scrollTo({ left: 0, behavior: "instant" });
    setupAutoTrack(related);
  }
  function open(product) {
    current = product;
    previousFocus = document.activeElement;
    qty = Math.max(1, getProductQuantity(product.id) || 1);
    title.textContent = product.name;
    brand.textContent = `Categoría: ${product.category} · Marca: ${product.brand} · ${product.availability}`;
    category.textContent = product.line;
    breadcrumb.textContent = `LIHEN.CO · ${product.line} · ${product.category.split("/")[0]}`;
    description.textContent = product.desc;
    price.textContent = product.price;
    details.innerHTML = `<li><strong>Línea:</strong> ${product.line}</li><li><strong>Disponibilidad:</strong> ${product.availability}</li><li><strong>Talla:</strong> ${product.size}</li><li><strong>Color o variante:</strong> ${product.color}</li>`;
    renderThumbs();
    renderRelated();
    updateButton();
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    dialog.focus();
    dialog.scrollTop = 0;
    modal.scrollTop = 0;
  }
  function close() {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    clearInterval(relatedAuto);
    setTimeout(() => {
      modal.hidden = true;
      previousFocus?.focus?.();
    }, 180);
  }
  function move(step) {
    const total = current?.images?.length || 0;
    if (total <= 1) return;
    index = (index + step + total) % total;
    gallery();
  }
  modal
    .querySelectorAll("[data-modal-close]")
    .forEach((el) => el.addEventListener("click", close));
  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
  modal
    .querySelector("[data-modal-qty-minus]")
    ?.addEventListener("click", () => {
      qty = Math.max(1, qty - 1);
      updateButton();
    });
  modal
    .querySelector("[data-modal-qty-plus]")
    ?.addEventListener("click", () => {
      qty = Math.min(99, qty + 1);
      updateButton();
    });
  select.addEventListener("click", () => {
    setProductQuantity(current.id, qty);
    updateButton();
  });
  whatsapp.addEventListener("click", () =>
    openWhatsApp(buildProductWhatsAppMessage(current, qty)),
  );
  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") move(-1);
    if (e.key === "ArrowRight") move(1);
  });
  return { open, close };
}
