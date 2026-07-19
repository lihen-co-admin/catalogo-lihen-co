import { getSupabaseClient } from "./supabaseClient.js";

export async function getAdminSession() {
  const client = await getSupabaseClient();
  if (!client) return { ok: false, reason: "not-configured", session: null };

  const { data, error } = await client.auth.getSession();
  if (error) return { ok: false, reason: "session-error", message: error.message, session: null };
  return { ok: true, session: data.session };
}

export async function signInAdmin(email, password) {
  const client = await getSupabaseClient();
  if (!client) return { ok: false, reason: "not-configured", message: "Supabase no está configurado." };

  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, reason: "auth-error", message: "No fue posible iniciar sesión. Verifica el correo y la contraseña." };

  const profileResult = await client
    .from("admin_profiles")
    .select("user_id, display_name, active")
    .eq("user_id", data.user.id)
    .eq("active", true)
    .maybeSingle();

  if (profileResult.error || !profileResult.data) {
    await client.auth.signOut();
    return { ok: false, reason: "not-authorized", message: "La cuenta existe, pero no está autorizada como administradora." };
  }

  return { ok: true, user: data.user, profile: profileResult.data, session: data.session };
}

export async function signOutAdmin() {
  const client = await getSupabaseClient();
  if (!client) return { ok: false };
  const { error } = await client.auth.signOut();
  return error ? { ok: false, message: error.message } : { ok: true };
}

export async function getAuthorizedAdmin() {
  const sessionResult = await getAdminSession();
  if (!sessionResult.ok || !sessionResult.session) return { ok: false, reason: "no-session" };

  const client = await getSupabaseClient();
  const { data, error } = await client
    .from("admin_profiles")
    .select("user_id, display_name, active")
    .eq("user_id", sessionResult.session.user.id)
    .eq("active", true)
    .maybeSingle();

  if (error || !data) return { ok: false, reason: "not-authorized" };
  return { ok: true, session: sessionResult.session, profile: data };
}
