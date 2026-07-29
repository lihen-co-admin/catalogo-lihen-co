const STATUS_LABELS = {
  new: "Nueva",
  in_review: "En revisión",
  answered: "Respondida",
  closed: "Cerrada",
};

export function formatAdminRequestDate(value) {
  if (!value) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function setAdminMessage(element, message, type = "info") {
  if (!element) return;
  element.hidden = !message;
  element.textContent = message || "";
  element.dataset.type = type;
}

export function createAdminRequestCard(request) {
  const article = document.createElement("article");
  article.className = "admin-request-card";
  article.dataset.requestId = request.id;

  article.innerHTML = `
    <div class="admin-request-card__top">
      <div>
        <p class="eyebrow">${formatAdminRequestDate(request.created_at)}</p>
        <h3></h3>
        <p class="admin-request-card__subject"></p>
      </div>
      <span class="status-badge" data-status="${request.status}">${STATUS_LABELS[request.status] ?? request.status}</span>
    </div>
    <dl class="admin-request-card__meta">
      <div><dt>Correo</dt><dd><a></a></dd></div>
      <div><dt>Teléfono</dt><dd></dd></div>
      <div><dt>Ciudad</dt><dd></dd></div>
      <div><dt>Canal preferido</dt><dd></dd></div>
    </dl>
    <div class="admin-request-card__message"><strong>Mensaje</strong><p></p></div>
    <div class="admin-request-card__actions">
      <label>Estado
        <select data-status-select>
          <option value="new">Nueva</option>
          <option value="in_review">En revisión</option>
          <option value="answered">Respondida</option>
          <option value="closed">Cerrada</option>
        </select>
      </label>
      <button class="button button-secondary" type="button" data-save-status>Guardar estado</button>
      <a class="button button-ghost" data-email-link>Responder por correo</a>
    </div>`;

  article.querySelector("h3").textContent = request.full_name;
  article.querySelector(".admin-request-card__subject").textContent = request.subject;

  const emailLink = article.querySelector(".admin-request-card__meta a");
  emailLink.textContent = request.email;
  emailLink.href = `mailto:${request.email}`;

  const values = article.querySelectorAll(".admin-request-card__meta dd");
  values[1].textContent = request.phone || "No informado";
  values[2].textContent = request.city || "No informada";
  values[3].textContent = request.preferred_channel === "whatsapp" ? "WhatsApp" : "Correo electrónico";

  article.querySelector(".admin-request-card__message p").textContent = request.message;
  article.querySelector("[data-status-select]").value = request.status;
  article.querySelector("[data-email-link]").href = `mailto:${request.email}?subject=${encodeURIComponent(`Respuesta LIHEN.CO: ${request.subject}`)}`;

  return article;
}

export function renderAdminRequests(requests) {
  const container = document.querySelector("[data-admin-list]");
  const empty = document.querySelector("[data-admin-empty]");
  const count = document.querySelector("[data-admin-count]");
  if (!container || !empty || !count) return;

  container.replaceChildren(...requests.map(createAdminRequestCard));
  empty.hidden = requests.length > 0;
  count.textContent = `${requests.length} solicitud${requests.length === 1 ? "" : "es"}`;
}

export function showAdminDashboard(profile) {
  const loginView = document.querySelector("[data-login-view]");
  const dashboardView = document.querySelector("[data-dashboard-view]");
  if (loginView) loginView.hidden = true;
  if (dashboardView) dashboardView.hidden = false;

  const name = document.querySelector("[data-admin-name]");
  if (name) name.textContent = profile.display_name || "Administración LIHEN.CO";
}

export function showAdminLogin() {
  const loginView = document.querySelector("[data-login-view]");
  const dashboardView = document.querySelector("[data-dashboard-view]");
  if (loginView) loginView.hidden = false;
  if (dashboardView) dashboardView.hidden = true;
}
