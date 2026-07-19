import { products } from "../data/products.js";
import {
  clearProductSelection,
  getSelectionSnapshot,
  changeProductQuantity,
  removeProductSelection,
  subscribeToProductSelection,
} from "../state/productSelection.js";
import {
  buildMultipleProductsWhatsAppMessage,
  openWhatsApp,
} from "../services/whatsappService.js";
import { getPrimaryImage } from "../utils/formatters.js";
export function setupSelectionDrawer() {
  const drawer = document.querySelector("[data-selection-drawer]"),
    list = document.querySelector("[data-selection-list]"),
    count = document.querySelector("[data-selection-count]"),
    summary = document.querySelector("[data-selection-summary]"),
    openButtons = [...document.querySelectorAll("[data-selection-open]")],
    closeButtons = [...document.querySelectorAll("[data-selection-close]")],
    clear = document.querySelector("[data-selection-clear]"),
    consultButtons = [...document.querySelectorAll("[data-selection-consult]")],
    fab = document.querySelector(".selection-fab"),
    bar = document.querySelector("[data-selection-bar]"),
    barSummary = document.querySelector("[data-selection-bar-summary]"),
    thumbs = document.querySelector("[data-selection-thumbs]");
  if (!drawer || !list) return;
  let snapshot = {};
  const selected = () =>
    products
      .filter((p) => snapshot[p.id])
      .map((p) => ({ ...p, quantity: snapshot[p.id] }));
  function open() {
    drawer.hidden = false;
    document.body.classList.add("selection-open");
    requestAnimationFrame(() => drawer.classList.add("is-open"));
    drawer.querySelector(".selection-drawer__panel")?.focus();
  }
  function close() {
    drawer.classList.remove("is-open");
    document.body.classList.remove("selection-open");
    setTimeout(() => (drawer.hidden = true), 180);
  }
  function send() {
    const items = selected();
    if (items.length) openWhatsApp(buildMultipleProductsWhatsAppMessage(items));
  }
  function render(data) {
    snapshot = data;
    const items = selected(),
      units = items.reduce((a, p) => a + p.quantity, 0);
    if (count) count.textContent = String(units);
    summary.textContent = `${items.length} producto${items.length === 1 ? "" : "s"} · ${units} unidad${units === 1 ? "" : "es"}`;
    if (barSummary)
      barSummary.textContent = `Mi selección · ${items.length} producto${items.length === 1 ? "" : "s"}`;
    if (fab) fab.hidden = !items.length;
    if (bar) bar.hidden = !items.length;
    consultButtons.forEach((b) => (b.disabled = !items.length));
    if (clear) clear.disabled = !items.length;
    if (thumbs)
      thumbs.innerHTML = items
        .slice(0, 4)
        .map((p) => `<img src="${getPrimaryImage(p)}" alt="">`)
        .join("");
    list.replaceChildren();
    if (!items.length) {
      list.innerHTML =
        '<p class="selection-drawer__empty">Todavía no has agregado productos a tu selección.</p>';
      return;
    }
    items.forEach((p) => {
      const item = document.createElement("article");
      item.className = "selection-item";
      item.innerHTML = `<img src="${getPrimaryImage(p)}" alt="${p.name}"><div class="selection-item__content"><strong>${p.name}</strong><span>${p.price} · ${p.line}</span><div class="selection-item__controls" aria-label="Cantidad del producto"><button type="button" data-minus aria-label="Restar">−</button><b>${p.quantity}</b><button type="button" data-plus aria-label="Sumar">+</button></div></div><button type="button" data-remove aria-label="Quitar ${p.name}">×</button>`;
      item
        .querySelector("[data-minus]")
        .addEventListener("click", () => changeProductQuantity(p.id, -1));
      item
        .querySelector("[data-plus]")
        .addEventListener("click", () => changeProductQuantity(p.id, 1));
      item
        .querySelector("[data-remove]")
        .addEventListener("click", () => removeProductSelection(p.id));
      list.append(item);
    });
  }
  openButtons.forEach((b) => b.addEventListener("click", open));
  closeButtons.forEach((b) => b.addEventListener("click", close));
  clear?.addEventListener("click", clearProductSelection);
  consultButtons.forEach((b) => b.addEventListener("click", send));
  document.addEventListener("keydown", (e) => {
    if (!drawer.hidden && e.key === "Escape") close();
  });
  subscribeToProductSelection(render);
}
