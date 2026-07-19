import { getSupabaseClient } from "../services/supabaseClient.js";

const ALLOWED_STATUSES = new Set(["new", "in_review", "answered", "closed"]);

export async function listContactRequests({ status = "all", search = "" } = {}) {
  const client = await getSupabaseClient();
  if (!client) return { ok: false, reason: "not-configured", data: [] };

  let query = client
    .from("contact_requests")
    .select("id, public_id, full_name, email, phone, city, preferred_channel, subject, message, created_at, status")
    .order("created_at", { ascending: false });

  if (status !== "all" && ALLOWED_STATUSES.has(status)) query = query.eq("status", status);

  const normalizedSearch = search.trim();
  if (normalizedSearch) {
    const safeSearch = normalizedSearch.replace(/[,%()]/g, " ").trim();
    if (safeSearch) query = query.or(`full_name.ilike.%${safeSearch}%,email.ilike.%${safeSearch}%,subject.ilike.%${safeSearch}%`);
  }

  const { data, error } = await query;
  if (error) return { ok: false, reason: "query-error", message: error.message, data: [] };
  return { ok: true, data: data ?? [] };
}

export async function updateContactRequestStatus(id, status) {
  if (!Number.isInteger(Number(id)) || !ALLOWED_STATUSES.has(status)) {
    return { ok: false, reason: "invalid-data", message: "El estado solicitado no es válido." };
  }

  const client = await getSupabaseClient();
  if (!client) return { ok: false, reason: "not-configured" };

  const { data, error } = await client
    .from("contact_requests")
    .update({ status })
    .eq("id", Number(id))
    .select("id, status")
    .single();

  if (error) return { ok: false, reason: "update-error", message: error.message };
  return { ok: true, data };
}
