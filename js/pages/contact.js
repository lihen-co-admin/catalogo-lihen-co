import { Customer } from "../models/Customer.js";
import { ContactRequest } from "../models/ContactRequest.js";
import { getSavedContactProfile } from "../repositories/contactRepository.js";
import { submitContactRequest } from "../services/contactService.js";
import { getSupabaseConnectionState } from "../services/supabaseClient.js";
import { validateContactData } from "../utils/contactValidations.js";

const FIELD_NAMES = ["fullName", "email", "phone", "city", "preferredChannel", "subject", "message", "acceptedPrivacy"];

function readFormData(form) {
  const formData = new FormData(form);
  return {
    fullName: String(formData.get("fullName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    city: String(formData.get("city") ?? ""),
    preferredChannel: String(formData.get("preferredChannel") ?? "whatsapp"),
    subject: String(formData.get("subject") ?? ""),
    message: String(formData.get("message") ?? ""),
    acceptedPrivacy: formData.get("acceptedPrivacy") === "on",
  };
}

function getField(form, name) {
  return form.elements.namedItem(name);
}

function clearErrors(form) {
  FIELD_NAMES.forEach((name) => {
    const field = getField(form, name);
    const error = form.querySelector(`[data-error-for="${name}"]`);
    field?.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  });
}

function showErrors(form, errors) {
  Object.entries(errors).forEach(([name, message]) => {
    const field = getField(form, name);
    const error = form.querySelector(`[data-error-for="${name}"]`);
    field?.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  });
  getField(form, Object.keys(errors)[0])?.focus();
}

function fillSavedProfile(form) {
  const profile = getSavedContactProfile();
  if (!profile) return;
  ["fullName", "email", "phone", "city", "preferredChannel"].forEach((name) => {
    const field = getField(form, name);
    if (field && profile[name]) field.value = profile[name];
  });
}

function updatePhoneRequirement(form) {
  const channel = getField(form, "preferredChannel")?.value;
  const phone = getField(form, "phone");
  if (!phone) return;
  const required = channel === "whatsapp";
  phone.required = required;
  phone.setAttribute("aria-required", String(required));
}

function setStatus(statusElement, type, message) {
  statusElement.className = `form-status form-status--${type}`;
  statusElement.textContent = message;
  statusElement.hidden = false;
  statusElement.focus();
}

export async function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-contact-status]");
  const counter = document.querySelector("[data-message-counter]");
  if (!form || !status) return;

  fillSavedProfile(form);
  updatePhoneRequirement(form);

  const connectionBadge = document.querySelector("[data-supabase-status]");
  const connection = await getSupabaseConnectionState();
  if (connectionBadge) {
    connectionBadge.textContent = connection.available ? "Conexión remota preparada" : "Modo local de práctica";
    connectionBadge.dataset.state = connection.available ? "online" : "local";
    connectionBadge.title = connection.message;
  }

  getField(form, "preferredChannel")?.addEventListener("change", () => updatePhoneRequirement(form));
  getField(form, "message")?.addEventListener("input", (event) => {
    if (counter) counter.textContent = `${event.currentTarget.value.length}/800`;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);
    status.hidden = true;

    const validation = validateContactData(readFormData(form));
    if (!validation.isValid) {
      showErrors(form, validation.errors);
      setStatus(status, "error", "Revisa los campos marcados antes de continuar.");
      return;
    }

    const customer = new Customer(validation.sanitized);
    const request = new ContactRequest({
      customer,
      subject: validation.sanitized.subject,
      message: validation.sanitized.message,
      acceptedPrivacy: validation.sanitized.acceptedPrivacy,
    });

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Guardando…";
    }

    const result = await submitContactRequest(request);

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }

    if (!result.ok) {
      setStatus(status, "error", `${result.message} Puedes usar WhatsApp como alternativa.`);
      return;
    }

    const successMessage = result.mode === "remote"
      ? `Gracias, ${customer.firstName}. Tu solicitud fue registrada correctamente para revisión de LIHEN.CO.`
      : `Gracias, ${customer.firstName}. La solicitud quedó respaldada en este navegador. La conexión remota todavía no está disponible, por lo que aún no fue recibida por LIHEN.CO.`;

    setStatus(status, "success", successMessage);

    form.reset();
    fillSavedProfile(form);
    updatePhoneRequirement(form);
    if (counter) counter.textContent = "0/800";
  });
}
