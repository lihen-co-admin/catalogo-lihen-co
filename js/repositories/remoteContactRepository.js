import { getSupabaseClient } from "../services/supabaseClient.js";

function mapRequestToRow(request) {
  const data = request.toJSON();
  return {
    public_id: data.id,
    full_name: data.customer.fullName,
    email: data.customer.email,
    phone: data.customer.phone || null,
    city: data.customer.city || null,
    preferred_channel: data.customer.preferredChannel,
    subject: data.subject,
    message: data.message,
    accepted_privacy: data.acceptedPrivacy,
    client_created_at: data.createdAt,
  };
}

export async function saveRemoteContactRequest(request) {
  const client = await getSupabaseClient();
  if (!client) {
    return {
      ok: false,
      reason: "not-configured",
      message: "Supabase no está configurado o no se pudo cargar.",
    };
  }

  try {
    const { data, error } = await client
      .from("contact_requests")
      .insert(mapRequestToRow(request))
      .select("id, public_id, created_at")
      .single();

    if (error) {
      console.warn("Supabase rechazó la solicitud de contacto.", error);
      return { ok: false, reason: "remote-error", message: error.message };
    }

    return { ok: true, data };
  } catch (error) {
    console.warn("Ocurrió un error de red al guardar en Supabase.", error);
    return { ok: false, reason: "network-error", message: error.message };
  }
}
