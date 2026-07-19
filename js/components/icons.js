const icons = {
  palette:
    '<circle cx="12" cy="12" r="9"/><circle cx="9" cy="8" r="1"/><circle cx="15" cy="8" r="1"/><circle cx="8" cy="14" r="1"/><path d="M16 14c2 0 3 1 3 2.5S18 20 16 20h-1c-1 0-2-.8-2-1.8 0-.6.3-1.2.8-1.6.6-.5 1.2-1 2.2-2.6Z"/>',
  shirt:
    '<path d="M8 4 4 6l2 4 2-1v11h8V9l2 1 2-4-4-2c-.5 1.3-1.8 2-4 2s-3.5-.7-4-2Z"/>',
  sparkles:
    '<path d="m12 2 1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2Z"/><path d="m19 14 .8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z"/><path d="m5 14 .8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z"/>',
  heart:
    '<path d="M20.8 4.6c-1.8-1.8-4.8-1.8-6.6 0L12 6.8 9.8 4.6a4.7 4.7 0 0 0-6.6 6.6L12 20l8.8-8.8a4.7 4.7 0 0 0 0-6.6Z"/>',
  badge:
    '<path d="M12 2 15 4l3.5.5.5 3.5 2 3-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5L5 14l-2-3 2-3 .5-3.5L9 4l3-2Z"/><path d="m9 11 2 2 4-4"/>',
  hand: '<path d="M3 13h4l3 3h6l5-5-2-2-4 3-3-3 2-2-2-2-5 5H3v3Z"/>',
  scale: '<path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6Zm10 0-4 7h8l-4-7ZM8 21h8"/>',
  camera:
    '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="m8 6 2-3h4l2 3"/><circle cx="12" cy="13" r="4"/>',
  file: '<path d="M6 2h8l4 4v16H6V2Z"/><path d="M14 2v5h5"/><path d="m9 15 2 2 4-4"/>',
  shield:
    '<path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/>',
  wand: '<path d="m4 20 10-10M12 4l1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1ZM18 12l.8-1.5.7 1.5 1.5.7-1.5.8-.7 1.5-.8-1.5-1.5-.8 1.5-.7Z"/>',
  pen: '<path d="m4 20 4-1 11-11-3-3L5 16l-1 4Z"/><path d="m14 7 3 3"/>',
  megaphone:
    '<path d="M3 11v4h4l9 4V7l-9 4H3Z"/><path d="m7 15 2 5h3l-2-5M19 9c1 1 1 5 0 6"/>',
  instagram:
    '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/>',
  printer: '<path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7v-7Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.2 1.2M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.2-1.2"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
  wallet:
    '<path d="M3 6h16v14H3V6Z"/><path d="M3 9h16M15 13h6v4h-6a2 2 0 0 1 0-4Z"/>',
  help: '<circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.7 2.7 0 1 1 4.5 2c-1.2.9-2 1.4-2 3M12 18h.01"/>',
  send: '<path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/>',

  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  message:
    '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"/>',
};
export function setupIcons() {
  document.querySelectorAll("[data-icon]").forEach((el) => {
    const body = icons[el.dataset.icon];
    if (body)
      el.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
  });
}
