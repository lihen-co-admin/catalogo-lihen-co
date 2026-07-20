const EVENT_DATE = new Date('2026-08-02T17:00:00-05:00');
const WHATSAPP_NUMBER = '573058947808';

function updateCountdown() {
  const host = document.querySelector('[data-launch-countdown]');
  if (!host) return;
  const remaining = Math.max(0, EVENT_DATE.getTime() - Date.now());
  const days = Math.floor(remaining / 86400000);
  const hours = Math.floor((remaining % 86400000) / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  host.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
  host.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
  host.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
}

function setupRegistration() {
  const form = document.querySelector('[data-launch-form]');
  const message = document.querySelector('[data-launch-form-message]');
  if (!form) return;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const phone = String(data.get('phone') || '').trim();
    const mode = String(data.get('mode') || '').trim();
    const text = [
      'Hola, LIHEN.CO ✨',
      'Quiero registrar mi interés para participar en la inauguración del 2 de agosto de 2026.',
      `Nombre: ${name}`,
      `WhatsApp: ${phone}`,
      `Modalidad de interés: ${mode}`,
      'Autorizo a LIHEN.CO para contactarme por WhatsApp con información relacionada con la inauguración y sus novedades.'
    ].join('\n');
    if (message) message.textContent = 'Abriremos WhatsApp para que revises y envíes tu registro.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  });
}

updateCountdown();
window.setInterval(updateCountdown, 60000);
setupRegistration();
