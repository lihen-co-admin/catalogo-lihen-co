/**
 * Reúne una solicitud de contacto con la persona que la creó.
 * En esta etapa se guarda únicamente en el navegador para practicar la lógica.
 */
export class ContactRequest {
  constructor({ customer, subject, message, acceptedPrivacy, createdAt = new Date() }) {
    this.id = globalThis.crypto?.randomUUID?.() ?? `local-${Date.now()}`;
    this.customer = customer;
    this.subject = subject.trim();
    this.message = message.trim();
    this.acceptedPrivacy = Boolean(acceptedPrivacy);
    this.createdAt = createdAt instanceof Date ? createdAt.toISOString() : createdAt;
    this.status = "local-pending";
  }

  toJSON() {
    return {
      id: this.id,
      customer: this.customer.toJSON(),
      subject: this.subject,
      message: this.message,
      acceptedPrivacy: this.acceptedPrivacy,
      createdAt: this.createdAt,
      status: this.status,
    };
  }
}
