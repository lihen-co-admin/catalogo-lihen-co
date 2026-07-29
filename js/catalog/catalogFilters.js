import { normalizeText } from "../utils/normalizeText.js";

export const CATALOG_LINES = ["Beauty Care", "Style"];

export const CATALOG_CATEGORY_GROUPS = {
  "Beauty Care": ["Todo", "Maquillaje", "Cuidado", "Accesorios", "Kits / combos"],
  Style: ["Todo", "Ropa deportiva", "Conjuntos", "Tops", "Enterizos"],
};

export function createCatalogState() {
  return {
    query: "",
    line: "Todos",
    category: "Todas",
    lineCategories: {
      "Beauty Care": "Todo",
      Style: "Todo",
    },
  };
}

export function getProductBucket(product) {
  const category = normalizeText(product.category);

  if (product.line === "Style") {
    if (category.includes("conjunto")) return "Conjuntos";
    if (category.includes("top") || category.includes("camis")) return "Tops";
    if (category.includes("enter")) return "Enterizos";
    return "Ropa deportiva";
  }

  if (category.includes("kit") || category.includes("combo")) return "Kits / combos";
  if (category.includes("accesor")) return "Accesorios";
  if (
    category.includes("cuidado") ||
    category.includes("skincare") ||
    category.includes("capilar") ||
    category.includes("corporal")
  ) {
    return "Cuidado";
  }

  return "Maquillaje";
}

export function filterCatalogProducts(products, state, lineName) {
  const normalizedQuery = normalizeText(state.query);
  const selectedLineCategory = state.lineCategories[lineName] || "Todo";

  return products.filter((product) => {
    if (product.line !== lineName) return false;
    if (state.line !== "Todos" && product.line !== state.line) return false;
    if (state.category !== "Todas" && product.category !== state.category) return false;
    if (selectedLineCategory !== "Todo" && getProductBucket(product) !== selectedLineCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = normalizeText(
      [product.name, product.brand, product.category, product.line, product.color].join(" "),
    );
    return searchableText.includes(normalizedQuery);
  });
}

export function getCatalogCategories(products) {
  return [...new Set(products.map((product) => product.category))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}
