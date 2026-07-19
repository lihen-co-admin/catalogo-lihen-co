export function formatProductCount(count) {
  return `${count} ${count === 1 ? "producto" : "productos"}`;
}

export function getPrimaryImage(product) {
  return product.images?.[0] || "./assets/images/lihen_logo_transparente.webp";
}
