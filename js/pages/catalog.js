import { products } from "../data/products.js";
import { createProductCard } from "../components/productCard.js";
import { createProductModal } from "../components/productModal.js";
import { normalizeText } from "../utils/normalizeText.js";
import { formatProductCount } from "../utils/formatters.js";
import { subscribeToProductSelection } from "../state/productSelection.js";

const lineState = {
  "Beauty Care": { category: "Todo" },
  Style: { category: "Todo" },
};
function bucket(product) {
  const c = normalizeText(product.category);
  if (product.line === "Style") {
    if (c.includes("conjunto")) return "Conjuntos";
    if (c.includes("top") || c.includes("camis")) return "Tops";
    if (c.includes("enter")) return "Enterizos";
    return "Ropa deportiva";
  }
  if (c.includes("kit") || c.includes("combo")) return "Kits / combos";
  if (c.includes("accesor")) return "Accesorios";
  if (
    c.includes("cuidado") ||
    c.includes("skincare") ||
    c.includes("capilar") ||
    c.includes("corporal")
  )
    return "Cuidado";
  return "Maquillaje";
}
export function setupCatalog() {
  const search = document.querySelector("[data-product-search]"),
    select = document.querySelector("[data-category-filter]"),
    count = document.querySelector("[data-result-count]");
  const lineButtons = [...document.querySelectorAll("[data-line-filter]")],
    modal = createProductModal();
  let query = "",
    line = "Todos",
    category = "Todas";
  if (select) {
    [...new Set(products.map((p) => p.category))]
      .sort((a, b) => a.localeCompare(b, "es"))
      .forEach((c) => {
        const o = document.createElement("option");
        o.value = c;
        o.textContent = c;
        select.append(o);
      });
  }
  const configs = {
    "Beauty Care": [
      "Todo",
      "Maquillaje",
      "Cuidado",
      "Accesorios",
      "Kits / combos",
    ],
    Style: ["Todo", "Ropa deportiva", "Conjuntos", "Tops", "Enterizos"],
  };
  Object.entries(configs).forEach(([ln, cats]) => {
    const holder = document.querySelector(`[data-category-pills="${ln}"]`);
    if (!holder) return;
    holder.innerHTML = cats
      .map(
        (c, i) =>
          `<button class="category-pill ${i === 0 ? "is-active" : ""}" type="button" data-catalog-category="${ln}" data-value="${c}">${c}</button>`,
      )
      .join("");
  });
  function filtered(ln) {
    const nq = normalizeText(query);
    return products.filter(
      (p) =>
        p.line === ln &&
        (line === "Todos" || p.line === line) &&
        (category === "Todas" || p.category === category) &&
        (lineState[ln].category === "Todo" ||
          bucket(p) === lineState[ln].category) &&
        (!nq ||
          normalizeText(
            [p.name, p.brand, p.category, p.line, p.color].join(" "),
          ).includes(nq)),
    );
  }
  function renderLine(ln) {
    const track = document.querySelector(`[data-product-carousel="${ln}"]`);
    if (!track) return;
    const list = filtered(ln);
    track.replaceChildren(...list.map((p) => createProductCard(p, modal.open)));
    setupAuto(track, ln);
    updateProgress(track, ln);
  }
  function render() {
    renderLine("Beauty Care");
    renderLine("Style");
    const total = filtered("Beauty Care").length + filtered("Style").length;
    if (count) count.textContent = formatProductCount(total);
  }
  function updateProgress(track, ln) {
    const bar = document.querySelector(`[data-carousel-progress="${ln}"]`);
    if (!bar) return;
    const ratio =
      track.scrollWidth <= track.clientWidth
        ? 1
        : (track.scrollLeft + track.clientWidth) / track.scrollWidth;
    bar.style.width = `${Math.max(12, ratio * 100)}%`;
  }
  function setupAuto(track, ln) {
    if (track.dataset.autoReady) return;
    track.dataset.autoReady = "1";
    let paused = false;
    const step = () => Math.max(260, track.clientWidth * 0.78);
    const tick = () => {
      if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10)
        track.scrollTo({ left: 0, behavior: "smooth" });
      else track.scrollBy({ left: step(), behavior: "smooth" });
    };
    const interval = setInterval(tick, 5200);
    track.addEventListener("mouseenter", () => (paused = true));
    track.addEventListener("mouseleave", () => (paused = false));
    track.addEventListener("touchstart", () => (paused = true), {
      passive: true,
    });
    track.addEventListener(
      "touchend",
      () => setTimeout(() => (paused = false), 2500),
      { passive: true },
    );
    track.addEventListener("scroll", () => updateProgress(track, ln), {
      passive: true,
    });
    document
      .querySelector(`[data-carousel-prev="${ln}"]`)
      ?.addEventListener("click", () =>
        track.scrollBy({ left: -step(), behavior: "smooth" }),
      );
    document
      .querySelector(`[data-carousel-next="${ln}"]`)
      ?.addEventListener("click", () =>
        track.scrollBy({ left: step(), behavior: "smooth" }),
      );
    window.addEventListener("beforeunload", () => clearInterval(interval), {
      once: true,
    });
  }
  search?.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });
  select?.addEventListener("change", (e) => {
    category = e.target.value;
    render();
  });
  lineButtons.forEach((btn) =>
    btn.addEventListener("click", () => {
      line = btn.dataset.lineFilter;
      lineButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (line !== "Todos")
        document
          .querySelector(line === "Style" ? "#style" : "#beauty-care")
          ?.scrollIntoView({ behavior: "smooth" });
      render();
    }),
  );
  document.querySelectorAll("[data-catalog-category]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const ln = btn.dataset.catalogCategory;
      lineState[ln].category = btn.dataset.value;
      document
        .querySelectorAll(`[data-catalog-category="${ln}"]`)
        .forEach((b) => b.classList.toggle("is-active", b === btn));
      renderLine(ln);
    }),
  );
  subscribeToProductSelection(render);
  render();
}
