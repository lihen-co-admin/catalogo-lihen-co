const STORAGE_KEY = "lihen-selected-products-v2";
const listeners = new Set();
let selected = load();
function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch {
    return {};
  }
}
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
}
function notify() {
  listeners.forEach((fn) => fn({ ...selected }));
}
export function isProductSelected(id) {
  return Boolean(selected[id]);
}
export function toggleProductSelection(id) {
  if (selected[id]) delete selected[id];
  else selected[id] = 1;
  persist();
  notify();
  return Boolean(selected[id]);
}
export function setProductQuantity(id, qty) {
  if (qty <= 0) delete selected[id];
  else selected[id] = Math.min(99, Math.max(1, qty));
  persist();
  notify();
}
export function changeProductQuantity(id, delta) {
  setProductQuantity(id, (selected[id] || 1) + delta);
}
export function getProductQuantity(id) {
  return selected[id] || 0;
}
export function removeProductSelection(id) {
  if (!selected[id]) return;
  delete selected[id];
  persist();
  notify();
}
export function clearProductSelection() {
  selected = {};
  persist();
  notify();
}
export function getSelectedProductIds() {
  return Object.keys(selected);
}
export function getSelectionSnapshot() {
  return { ...selected };
}
export function subscribeToProductSelection(listener) {
  listeners.add(listener);
  listener({ ...selected });
  return () => listeners.delete(listener);
}
