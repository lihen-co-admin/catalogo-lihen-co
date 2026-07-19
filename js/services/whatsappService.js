const WHATSAPP_NUMBER = "";
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
  if (!WHATSAPP_NUMBER) {
    navigator.clipboard?.writeText(message).catch(() => {});
    alert(
      "El número oficial de WhatsApp todavía está pendiente. El mensaje de consulta fue copiado.",
    );
    return;
  }
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}
export function setupWhatsAppButton() {
  document
    .querySelectorAll("[data-whatsapp-button]")
    .forEach((b) => b.addEventListener("click", () => openWhatsApp()));
}
