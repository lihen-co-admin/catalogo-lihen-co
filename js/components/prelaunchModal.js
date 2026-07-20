const WHATSAPP_NUMBER = '573058947808';
const GROUP_URL = 'https://chat.whatsapp.com/FUaa4tGIDOTBeqJOMmbrJT';
let lastTrigger = null;
let currentPayload = { rows: [], totalUnits: 0 };

const safe = (value = '') => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

function whatsappUrl(rows, totalUnits) {
  const lines = rows.map(({ product, qty }) => `• ${qty} × ${product.name} (${product.brand})`);
  const text = [
    'Hola, LIHEN.CO 💫',
    '',
    'Me interesa consultar disponibilidad, variantes y precio de esta selección:',
    '',
    ...lines,
    '',
    `Total de unidades: ${totalUnits}.`,
    '',
    'También quiero recibir información sobre la inauguración de LIHEN.CO del 2 de agosto de 2026.',
    '',
    'Autorizo que me contacten por WhatsApp para responder esta consulta y compartir información relacionada con la inauguración y novedades de LIHEN.CO.'
  ].join('\n');
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function ensureModal() {
  let backdrop = document.querySelector('[data-prelaunch-modal]');
  if (backdrop) return backdrop;
  backdrop = document.createElement('div');
  backdrop.className = 'prelaunch-modal';
  backdrop.dataset.prelaunchModal = '';
  backdrop.hidden = true;
  backdrop.innerHTML = `
    <section class="prelaunch-modal__content" role="dialog" aria-modal="true" aria-labelledby="prelaunch-title" aria-describedby="prelaunch-description">
      <button class="prelaunch-modal__close" type="button" data-prelaunch-close aria-label="Cerrar">×</button>
      <div class="prelaunch-modal__intro">
        <p class="prelaunch-modal__eyebrow">Tu selección está lista</p>
        <h2 id="prelaunch-title">¡Estamos a pocos días de nuestra inauguración oficial!</h2>
        <p id="prelaunch-description">¡Qué emoción que encontraste productos que te gustan! LIHEN.CO está preparando con mucho amor su inauguración presencial y virtual este <strong>2 de agosto de 2026</strong>.</p>
      </div>
      <div class="prelaunch-modal__summary" data-prelaunch-summary></div>
      <p class="prelaunch-modal__notice">Esta selección todavía no corresponde a una compra final. La disponibilidad, las variantes y el precio se confirmarán directamente con LIHEN.CO.</p>
      <div class="prelaunch-modal__actions">
        <a class="prelaunch-modal__action prelaunch-modal__action--primary" href="./inauguracion/">Registrarme a la inauguración</a>
        <a class="prelaunch-modal__action prelaunch-modal__action--soft" href="${GROUP_URL}" target="_blank" rel="noopener noreferrer">Unirme al grupo oficial</a>
        <a class="prelaunch-modal__action prelaunch-modal__action--outline" data-prelaunch-whatsapp href="#" target="_blank" rel="noopener noreferrer">Enviar mi consulta</a>
        <button class="prelaunch-modal__continue" type="button" data-prelaunch-close>Seguir explorando</button>
      </div>
    </section>`;
  document.body.append(backdrop);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop || event.target.closest('[data-prelaunch-close]')) closePrelaunchModal();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !backdrop.hidden) closePrelaunchModal();
  });
  return backdrop;
}

function renderSummary(backdrop) {
  const { rows, totalUnits } = currentPayload;
  const summary = backdrop.querySelector('[data-prelaunch-summary]');
  if (!summary) return;
  summary.innerHTML = `
    <div class="prelaunch-modal__metrics">
      <span><strong>${rows.length}</strong> referencias</span>
      <span><strong>${totalUnits}</strong> unidades</span>
    </div>
    <ul>${rows.map(({ product, qty }) => `<li><span>${safe(product.name)}</span><strong>${qty}</strong></li>`).join('')}</ul>`;
  const whatsapp = backdrop.querySelector('[data-prelaunch-whatsapp]');
  if (whatsapp) whatsapp.href = whatsappUrl(rows, totalUnits);
}

export function openPrelaunchModal(payload, trigger = document.activeElement) {
  if (!payload?.rows?.length) return;
  currentPayload = payload;
  lastTrigger = trigger instanceof HTMLElement ? trigger : null;
  const backdrop = ensureModal();
  renderSummary(backdrop);
  backdrop.hidden = false;
  document.body.classList.add('no-scroll');
  window.requestAnimationFrame(() => backdrop.classList.add('is-open'));
  backdrop.querySelector('.prelaunch-modal__close')?.focus();
}

export function closePrelaunchModal() {
  const backdrop = document.querySelector('[data-prelaunch-modal]');
  if (!backdrop || backdrop.hidden) return;
  backdrop.classList.remove('is-open');
  window.setTimeout(() => {
    backdrop.hidden = true;
    document.body.classList.remove('no-scroll');
    lastTrigger?.focus();
  }, 180);
}
