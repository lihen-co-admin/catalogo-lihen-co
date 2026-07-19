import { getSupabaseClient } from "./supabaseClient.js";

const CHANNEL_NAME = "lihen-inauguracion-presence-v1";
const LOCAL_KEY = "lihen_room_presence_local_v1";

function flattenPresence(state) {
  return Object.values(state).flat().map(item => ({
    id: item.id,
    displayName: item.displayName,
    mode: item.mode,
    role: item.role || "participant",
    joinedAt: item.joinedAt,
  }));
}

function createLocalPresence(identity, onChange) {
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(CHANNEL_NAME) : null;
  const peers = new Map();
  const emit = () => onChange([...peers.values()]);
  const announce = type => channel?.postMessage({ type, identity });
  const listener = event => {
    const message = event.data;
    if (!message?.identity?.id) return;
    if (message.type === "join" || message.type === "hello") peers.set(message.identity.id, message.identity);
    if (message.type === "leave") peers.delete(message.identity.id);
    if (message.type === "join") announce("hello");
    emit();
  };
  channel?.addEventListener("message", listener);
  peers.set(identity.id, identity);
  localStorage.setItem(LOCAL_KEY, JSON.stringify(identity));
  announce("join"); emit();
  return {
    mode: "local",
    leave() { announce("leave"); peers.delete(identity.id); channel?.close(); emit(); },
  };
}

export async function joinRoomPresence(identity, onChange, onConnectionChange = () => {}) {
  const normalized = { ...identity, joinedAt: identity.joinedAt || new Date().toISOString() };
  const client = await getSupabaseClient();
  if (!client) {
    onConnectionChange("local");
    return createLocalPresence(normalized, onChange);
  }

  const channel = client.channel(CHANNEL_NAME, { config: { presence: { key: normalized.id } } });
  channel
    .on("presence", { event: "sync" }, () => onChange(flattenPresence(channel.presenceState())))
    .on("presence", { event: "join" }, () => onChange(flattenPresence(channel.presenceState())))
    .on("presence", { event: "leave" }, () => onChange(flattenPresence(channel.presenceState())));

  await new Promise(resolve => {
    channel.subscribe(async status => {
      onConnectionChange(status);
      if (status === "SUBSCRIBED") {
        await channel.track(normalized);
        resolve();
      }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") resolve();
    });
  });

  return {
    mode: "remote",
    async leave() { await channel.untrack(); await client.removeChannel(channel); },
  };
}
