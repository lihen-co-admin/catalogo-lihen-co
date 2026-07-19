import { products } from "../data/products.js";
const groups = {
  "Beauty Care": [
    ["Maquillaje", ["Rostro", "Labios", "Ojos", "Accesorios"]],
    [
      "Cuidado",
      ["Cuidado facial", "Cuidado corporal", "Cuidado capilar", "Skincare"],
    ],
    [
      "Explorar",
      ["Novedades", "Kits", "Cómo consultar", "Preguntas frecuentes"],
    ],
    ["LIHEN", ["Inicio", "Propósito", "Experiencias", "Contacto"]],
  ],
  Style: [
    ["Ropa", ["Ropa deportiva", "Tops", "Conjuntos", "Enterizos"]],
    [
      "Explorar",
      ["Novedades", "Tallas", "Cómo consultar", "Preguntas frecuentes"],
    ],
    ["LIHEN", ["Inicio", "Propósito", "Experiencias", "Contacto"]],
  ],
};
export function setupMegaMenu() {
  const menu = document.querySelector("[data-mega-menu]"),
    links = document.querySelector("[data-mega-links]"),
    visuals = document.querySelector("[data-mega-products]"),
    triggers = [...document.querySelectorAll("[data-mega-trigger]")];
  if (!menu || !links || !visuals) return;
  let active = "",
    timer,
    rotation;
  function render(line) {
    active = line;
    links.innerHTML = (groups[line] || [])
      .map(
        ([title, items]) =>
          `<div class="mega-column"><h3>${title}</h3>${items.map((x) => `<a href="#${line === "Style" ? "style" : "beauty-care"}">${x}</a>`).join("")}</div>`,
      )
      .join("");
    rotate(line);
    menu.hidden = false;
    triggers.forEach((t) =>
      t.setAttribute("aria-expanded", String(t.dataset.megaTrigger === line)),
    );
  }
  function rotate(line) {
    clearInterval(rotation);
    const pool = products.filter((p) => p.line === line && p.images?.length);
    function paint() {
      const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
      visuals.innerHTML = shuffled
        .map(
          (p) =>
            `<a class="mega-product" href="#${line === "Style" ? "style" : "beauty-care"}"><img src="${p.images[Math.floor(Math.random() * p.images.length)]}" alt="${p.name}"><span>${p.name}</span></a>`,
        )
        .join("");
    }
    paint();
    rotation = setInterval(paint, 6500);
  }
  function close() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      menu.hidden = true;
      active = "";
      triggers.forEach((t) => t.setAttribute("aria-expanded", "false"));
      clearInterval(rotation);
    }, 220);
  }
  triggers.forEach((t) => {
    t.addEventListener("mouseenter", () => render(t.dataset.megaTrigger));
    t.addEventListener("focus", () => render(t.dataset.megaTrigger));
    t.addEventListener("click", () => {
      if (innerWidth < 1120) {
        document
          .querySelector(
            t.dataset.megaTrigger === "Style" ? "#style" : "#beauty-care",
          )
          ?.scrollIntoView();
      } else render(t.dataset.megaTrigger);
    });
  });
  menu.addEventListener("mouseenter", () => clearTimeout(timer));
  menu.addEventListener("mouseleave", close);
  document
    .querySelector(".header-inner")
    ?.addEventListener("mouseleave", (e) => {
      if (!menu.contains(e.relatedTarget)) close();
    });
}
