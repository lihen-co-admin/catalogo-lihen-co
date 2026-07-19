import { getAuthorizedAdmin, signInAdmin, signOutAdmin } from "../services/adminAuthService.js";
import { listContactRequests, updateContactRequestStatus } from "../repositories/adminContactRepository.js";

const STATUS_LABELS = {
  new: "Nueva",
  in_review: "En revisión",
  answered: "Respondida",
  closed: "Cerrada",
};

const state = { requests: [], status: "all", search: "" };

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  return new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function setMessage(element, message, type = "info") {
  if (!element) return;
  element.hidden = !message;
  element.textContent = message || "";
  element.dataset.type = type;
}

function createRequestCard(request) {
  const article = document.createElement("article");
  article.className = "admin-request-card";
  article.dataset.requestId = request.id;

  const safePhone = request.phone || "No informado";
  const safeCity = request.city || "No informada";
  article.innerHTML = `
    <div class="admin-request-card__top">
      <div>
        <p class="eyebrow">${formatDate(request.created_at)}</p>
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
  values[1].textContent = safePhone;
  values[2].textContent = safeCity;
  values[3].textContent = request.preferred_channel === "whatsapp" ? "WhatsApp" : "Correo electrónico";
  article.querySelector(".admin-request-card__message p").textContent = request.message;
  article.querySelector("[data-status-select]").value = request.status;
  article.querySelector("[data-email-link]").href = `mailto:${request.email}?subject=${encodeURIComponent(`Respuesta LIHEN.CO: ${request.subject}`)}`;

  return article;
}

function renderRequests() {
  const container = document.querySelector("[data-admin-list]");
  const empty = document.querySelector("[data-admin-empty]");
  const count = document.querySelector("[data-admin-count]");
  if (!container || !empty || !count) return;

  container.replaceChildren(...state.requests.map(createRequestCard));
  empty.hidden = state.requests.length > 0;
  count.textContent = `${state.requests.length} solicitud${state.requests.length === 1 ? "" : "es"}`;
}

async function loadRequests() {
  const status = document.querySelector("[data-admin-status]");
  const loader = document.querySelector("[data-admin-loading]");
  loader.hidden = false;
  setMessage(status, "");

  const result = await listContactRequests({ status: state.status, search: state.search });
  loader.hidden = true;
  if (!result.ok) {
    setMessage(status, "No fue posible consultar las solicitudes. Revisa la conexión y las políticas de Supabase.", "error");
    state.requests = [];
  } else {
    state.requests = result.data;
  }
  renderRequests();
}

function showAdmin(profile) {
  document.querySelector("[data-login-view]").hidden = true;
  document.querySelector("[data-dashboard-view]").hidden = false;
  const name = document.querySelector("[data-admin-name]");
  if (name) name.textContent = profile.display_name || "Administración LIHEN.CO";
  loadRequests();
}

function showLogin() {
  document.querySelector("[data-login-view]").hidden = false;
  document.querySelector("[data-dashboard-view]").hidden = true;
}

function setupLogin() {
  const form = document.querySelector("[data-admin-login]");
  const message = document.querySelector("[data-login-message]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type='submit']");
    submit.disabled = true;
    setMessage(message, "Comprobando credenciales…");
    const formData = new FormData(form);
    const result = await signInAdmin(String(formData.get("email") || "").trim(), String(formData.get("password") || ""));
    submit.disabled = false;
    if (!result.ok) return setMessage(message, result.message || "No fue posible iniciar sesión.", "error");
    form.reset();
    setMessage(message, "");
    showAdmin(result.profile);
  });
}

function setupDashboardActions() {
  document.querySelector("[data-admin-refresh]").addEventListener("click", loadRequests);
  document.querySelector("[data-admin-logout]").addEventListener("click", async () => {
    await signOutAdmin();
    showLogin();
  });

  document.querySelector("[data-admin-filter]").addEventListener("change", (event) => {
    state.status = event.target.value;
    loadRequests();
  });

  const searchForm = document.querySelector("[data-admin-search-form]");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = String(new FormData(searchForm).get("search") || "").trim();
    loadRequests();
  });

  document.querySelector("[data-admin-list]").addEventListener("click", async (event) => {
    const button = event.target.closest("[data-save-status]");
    if (!button) return;
    const card = button.closest("[data-request-id]");
    const select = card.querySelector("[data-status-select]");
    button.disabled = true;
    const result = await updateContactRequestStatus(card.dataset.requestId, select.value);
    button.disabled = false;
    if (!result.ok) return alert("No fue posible actualizar el estado.");
    await loadRequests();
  });
}

async function startAdminPage() {
  setupLogin();
  setupDashboardActions();
  const authorized = await getAuthorizedAdmin();
  if (authorized.ok) showAdmin(authorized.profile);
  else showLogin();
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", startAdminPage);
