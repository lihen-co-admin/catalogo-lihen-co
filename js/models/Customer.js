/**
 * Representa los datos básicos que una persona entrega voluntariamente
 * para recibir atención de LIHEN.CO.
 */
export class Customer {
  constructor({ fullName, email, phone = "", city = "", preferredChannel = "whatsapp" }) {
    this.fullName = fullName.trim();
    this.email = email.trim().toLowerCase();
    this.phone = phone.trim();
    this.city = city.trim();
    this.preferredChannel = preferredChannel;
  }

  get firstName() {
    return this.fullName.split(/\s+/)[0] || this.fullName;
  }

  toJSON() {
    return {
      fullName: this.fullName,
      email: this.email,
      phone: this.phone,
      city: this.city,
      preferredChannel: this.preferredChannel,
    };
  }
}
