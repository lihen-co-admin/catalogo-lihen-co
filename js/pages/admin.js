import { getAuthorizedAdmin, signInAdmin, signOutAdmin } from "../services/adminAuthService.js";
import { listContactRequests, updateContactRequestStatus } from "../repositories/adminContactRepository.js";
import {
  renderAdminRequests,
  setAdminMessage,
  showAdminDashboard,
  showAdminLogin,
} from "../admin/adminRequestView.js";

const state = { requests: [], status: "all", search: "" };

async function loadRequests() {
  const status = document.querySelector("[data-admin-status]");
  const loader = document.querySelector("[data-admin-loading]");
  if (loader) loader.hidden = false;
  setAdminMessage(status, "");

  const result = await listContactRequests({ status: state.status, search: state.search });
  if (loader) loader.hidden = true;

  if (!result.ok) {
    setAdminMessage(
      status,
      "No fue posible consultar las solicitudes. Revisa la conexión y las políticas de Supabase.",
      "error",
    );
    state.requests = [];
  } else {
    state.requests = result.data;
  }

  renderAdminRequests(state.requests);
}

async function openAdmin(profile) {
  showAdminDashboard(profile);
  await loadRequests();
}

function setupLogin() {
  const form = document.querySelector("[data-admin-login]");
  const message = document.querySelector("[data-login-message]");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const submit = form.querySelector("button[type='submit']");
    if (submit) submit.disabled = true;
    setAdminMessage(message, "Comprobando credenciales…");

    const formData = new FormData(form);
    const result = await signInAdmin(
      String(formData.get("email") || "").trim(),
      String(formData.get("password") || ""),
    );

    if (submit) submit.disabled = false;
    if (!result.ok) {
      setAdminMessage(message, result.message || "No fue posible iniciar sesión.", "error");
      return;
    }

    form.reset();
    setAdminMessage(message, "");
    await openAdmin(result.profile);
  });
}

function setupDashboardActions() {
  document.querySelector("[data-admin-refresh]")?.addEventListener("click", loadRequests);
  document.querySelector("[data-admin-logout]")?.addEventListener("click", async () => {
    await signOutAdmin();
    showAdminLogin();
  });

  document.querySelector("[data-admin-filter]")?.addEventListener("change", (event) => {
    state.status = event.target.value;
    loadRequests();
  });

  const searchForm = document.querySelector("[data-admin-search-form]");
  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    state.search = String(new FormData(searchForm).get("search") || "").trim();
    loadRequests();
  });

  document.querySelector("[data-admin-list]")?.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-save-status]");
    if (!button) return;

    const card = button.closest("[data-request-id]");
    const select = card?.querySelector("[data-status-select]");
    if (!card || !select) return;

    button.disabled = true;
    const result = await updateContactRequestStatus(card.dataset.requestId, select.value);
    button.disabled = false;

    if (!result.ok) {
      window.alert("No fue posible actualizar el estado.");
      return;
    }

    await loadRequests();
  });
}

async function startAdminPage() {
  setupLogin();
  setupDashboardActions();

  const authorized = await getAuthorizedAdmin();
  if (authorized.ok) await openAdmin(authorized.profile);
  else showAdminLogin();

  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();
}

document.addEventListener("DOMContentLoaded", startAdminPage);
