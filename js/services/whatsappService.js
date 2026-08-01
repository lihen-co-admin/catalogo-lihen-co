const OFFICIAL_WHATSAPP_URL = "https://wa.me/message/2JDWBH57SQG4F1";
export function buildProductWhatsAppMessage(product, quantity = 1) {
  return [
    "Hola LIHEN.CO, vengo de la página web y quiero consultar este producto:",
    "",
    `Producto: ${product.name}`,
    `Cantidad: ${quantity}`,
    `Marca: ${product.brand}`,
    `Línea: ${product.line}`,
    `Categoría: ${product.category}`,
    `Talla: ${product.size}`,
    `Color o variante: ${product.color}`,
    `Precio mostrado: ${product.price}`,
    "",
    "Quedo atenta/o a disponibilidad, precio final, medios de pago, facturación y entrega.",
  ].join("\n");
}
export function buildMultipleProductsWhatsAppMessage(items) {
  const lines = items.flatMap((p, i) => [
    `${i + 1}. ${p.name}`,
    `   Cantidad: ${p.quantity || 1}`,
    `   Marca: ${p.brand}`,
    `   Línea: ${p.line}`,
    `   Categoría: ${p.category}`,
    `   Talla: ${p.size}`,
    `   Color o variante: ${p.color}`,
    `   Precio mostrado: ${p.price}`,
    "",
  ]);
  return [
    "Hola LIHEN.CO, vengo de la página web y quiero consultar esta selección:",
    "",
    ...lines,
    "Esta selección no es compra ni reserva. Quedo atenta/o a disponibilidad, precio final, medios de pago, facturación y entrega.",
  ].join("\n");
}
export function openWhatsApp(
  message = "Hola LIHEN.CO, quiero consultar productos disponibles.",
) {
  navigator.clipboard?.writeText(message).catch(() => {});
  window.open(
    OFFICIAL_WHATSAPP_URL,
    "_blank",
    "noopener,noreferrer",
  );
}
export function setupWhatsAppButton() {
  document
    .querySelectorAll("[data-whatsapp-button]")
    .forEach((b) => b.addEventListener("click", () => openWhatsApp()));
}
