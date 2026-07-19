export class Participant {
  constructor({ id, name, email, displayName, mode, acceptedRules, accessCode, createdAt = new Date().toISOString(), status = "registered" }) {
    this.id = id;
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.displayName = displayName.trim();
    this.mode = mode;
    this.acceptedRules = Boolean(acceptedRules);
    this.accessCode = accessCode;
    this.createdAt = createdAt;
    this.status = status;
  }
  get initials() { return this.displayName.split(/\s+/).slice(0,2).map(part => part[0]?.toUpperCase()).join("") || "LI"; }
  toRecord() { return { public_id:this.id, full_name:this.name, email:this.email, display_name:this.displayName, modality:this.mode, accepted_rules:this.acceptedRules, access_code:this.accessCode, registration_status:this.status, created_at:this.createdAt }; }
}
