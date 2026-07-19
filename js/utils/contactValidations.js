const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,20}$/;

export function normalizeSpaces(value = "") {
  return value.trim().replace(/\s+/g, " ");
}

export function validateContactData(data) {
  const errors = {};
  const fullName = normalizeSpaces(data.fullName);
  const email = data.email.trim();
  const phone = data.phone.trim();
  const subject = normalizeSpaces(data.subject);
  const message = normalizeSpaces(data.message);

  if (fullName.length < 3) {
    errors.fullName = "Escribe tu nombre completo (mínimo 3 caracteres).";
  } else if (fullName.length > 80) {
    errors.fullName = "El nombre no puede superar 80 caracteres.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Escribe un correo válido, por ejemplo: nombre@correo.com.";
  }

  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = "Usa entre 7 y 20 caracteres válidos para el teléfono.";
  }

  if (data.preferredChannel === "whatsapp" && !phone) {
    errors.phone = "El teléfono es obligatorio cuando eliges WhatsApp.";
  }

  if (subject.length < 3) {
    errors.subject = "Selecciona o escribe un asunto válido.";
  }

  if (message.length < 15) {
    errors.message = "Cuéntanos un poco más; escribe al menos 15 caracteres.";
  } else if (message.length > 800) {
    errors.message = "El mensaje no puede superar 800 caracteres.";
  }

  if (!data.acceptedPrivacy) {
    errors.acceptedPrivacy = "Debes autorizar el uso de los datos para gestionar tu consulta.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      ...data,
      fullName,
      email: email.toLowerCase(),
      phone,
      city: normalizeSpaces(data.city),
      subject,
      message,
    },
  };
}
