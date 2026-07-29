export function normalizeInvitationCode(value) {
  return String(value || "").trim().toUpperCase();
}

export function cleanInvitationName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

export function normalizeInvitationName(value) {
  return cleanInvitationName(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.,/#!$%^&*;:{}=_`~()¿?¡+\\-]/g, " ")
    .replace(/\s+/g, " ")
    .toLowerCase();
}

export function invitationNameWords(value) {
  return normalizeInvitationName(value).split(" ").filter(Boolean);
}

export function buildInvitationAliases(displayName = "") {
  const aliases = new Set();
  const normalizedFull = normalizeInvitationName(displayName);

  if (normalizedFull) aliases.add(normalizedFull);

  const rawParts = displayName
    .split(/\s+y\s+/i)
    .map((part) => cleanInvitationName(part))
    .filter(Boolean);

  if (rawParts.length > 1) {
    const normalizedParts = rawParts.map((part) => invitationNameWords(part));
    const lastPartWords = normalizedParts[normalizedParts.length - 1] || [];
    const sharedSurname = lastPartWords.length > 1
      ? lastPartWords[lastPartWords.length - 1]
      : "";

    rawParts.forEach((part, index) => {
      const partWords = invitationNameWords(part);
      if (!partWords.length) return;

      aliases.add(partWords.join(" "));

      if (partWords.length === 1 && sharedSurname) {
        aliases.add(`${partWords[0]} ${sharedSurname}`.trim());
      }

      if (index === 0 && partWords.length >= 2) {
        aliases.add(partWords.slice(0, Math.min(3, partWords.length)).join(" "));
      }
    });
  } else {
    const nameWords = invitationNameWords(displayName);

    if (nameWords.length) {
      aliases.add(nameWords.join(" "));
      aliases.add(nameWords.slice(0, Math.min(3, nameWords.length)).join(" "));
    }
  }

  return [...aliases].filter(Boolean);
}

export function matchesInvitationName(typedName, invitation) {
  const typed = normalizeInvitationName(typedName);
  if (!typed) return false;

  const typedWords = typed.split(" ").filter(Boolean);
  const aliases = buildInvitationAliases(invitation.display_name);

  return aliases.some((alias) => {
    const aliasWords = alias.split(" ").filter(Boolean);
    if (!aliasWords.length) return false;
    if (alias === typed) return true;
    if (alias.startsWith(typed) || typed.startsWith(alias)) return true;

    if (typedWords.length <= aliasWords.length) {
      const prefixMatches = typedWords.every(
        (word, index) => aliasWords[index] === word
      );
      if (prefixMatches) return true;
    }

    return false;
  });
}
