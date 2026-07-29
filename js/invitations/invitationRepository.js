import { getSupabaseConfig } from "../config/supabase.js?v=171";
import { LOCAL_INVITATIONS } from "../data/localInvitations.js?v=171";
import { normalizeInvitationCode } from "./invitationValidators.js?v=180";

const DEMO_INVITATION = Object.freeze({
  access_code: "LHN-DEMO-001",
  display_name: "Lizeth Londoño",
  responsible: "Lizeth Londoño",
  named_guests: 1,
  max_attendees: 3,
  status: "pending"
});

const localInvitationMap = new Map(
  LOCAL_INVITATIONS.map((invitation) => [
    normalizeInvitationCode(invitation.access_code),
    invitation
  ])
);

function createSupabaseHeaders(config) {
  return {
    apikey: config.anonKey,
    Authorization: `Bearer ${config.anonKey}`,
    "Content-Type": "application/json"
  };
}

function isLocalInvitationCode(code) {
  return (
    code === DEMO_INVITATION.access_code ||
    localInvitationMap.has(code)
  );
}

export async function findInvitationByCode(value) {
  const code = normalizeInvitationCode(value);

  if (!code) return null;
  if (code === DEMO_INVITATION.access_code) return DEMO_INVITATION;
  if (localInvitationMap.has(code)) return localInvitationMap.get(code);

  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    throw new Error(
      "No encontramos una invitación asociada a este enlace. " +
      "Solicita a la persona que te invitó que te reenvíe tu enlace personal."
    );
  }

  const response = await fetch(
    `${config.url}/rest/v1/rpc/get_invitation_by_code`,
    {
      method: "POST",
      headers: createSupabaseHeaders(config),
      body: JSON.stringify({ p_code: code })
    }
  );

  if (!response.ok) {
    throw new Error(
      "No pudimos validar la invitación en este momento."
    );
  }

  const result = await response.json();
  return Array.isArray(result) ? result[0] : result;
}

export async function confirmInvitation({
  accessCode,
  mode,
  attendees
}) {
  const code = normalizeInvitationCode(accessCode);
  const config = getSupabaseConfig();

  if (!config.isConfigured) {
    if (isLocalInvitationCode(code)) {
      return { ok: true, local: true, location: null };
    }

    throw new Error("Supabase no está configurado.");
  }

  const response = await fetch(
    `${config.url}/rest/v1/rpc/confirm_invitation`,
    {
      method: "POST",
      headers: createSupabaseHeaders(config),
      body: JSON.stringify({
        p_code: code,
        p_mode: mode,
        p_attendees: attendees
      })
    }
  );

  if (!response.ok) {
    throw new Error("No pudimos guardar la confirmación.");
  }

  return response.json();
}
