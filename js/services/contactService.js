import { saveLocalContactRequest, updateLocalRequestSyncStatus } from "../repositories/contactRepository.js";
import { saveRemoteContactRequest } from "../repositories/remoteContactRepository.js";

/**
 * Guarda primero una copia local y después intenta enviarla a Supabase.
 * De esta manera una falla de red no borra la consulta escrita por la persona.
 */
export async function submitContactRequest(request) {
  const localSaved = saveLocalContactRequest(request, "pending-remote");
  if (!localSaved) {
    return { ok: false, mode: "none", message: "El navegador no permitió crear el respaldo local." };
  }

  const remoteResult = await saveRemoteContactRequest(request);
  if (remoteResult.ok) {
    updateLocalRequestSyncStatus(request.id, "synced");
    return { ok: true, mode: "remote", remote: remoteResult.data };
  }

  updateLocalRequestSyncStatus(request.id, "pending-remote");
  return {
    ok: true,
    mode: "local-fallback",
    reason: remoteResult.reason,
    message: remoteResult.message,
  };
}
