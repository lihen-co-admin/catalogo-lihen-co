export function createInvitationState() {
  let invitation = null;
  let mode = null;
  let count = 1;
  let typedName = "";
  let urlCode = "";
  let location = null;

  return {
    get invitation() { return invitation; },
    get mode() { return mode; },
    get count() { return count; },
    get typedName() { return typedName; },
    get urlCode() { return urlCode; },
    get location() { return location; },

    setInvitation(value) {
      invitation = value;
      count = Math.max(1, Number(value?.named_guests || 1));
      if (value?.virtual_only && mode === "presencial") mode = null;
      return invitation;
    },

    setMode(value) {
      mode = value || null;
      if (mode !== "presencial") location = null;
      return mode;
    },

    setCount(value) {
      const parsed = Number(value);
      count = Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
      return count;
    },

    setTypedName(value) {
      typedName = String(value || "");
      return typedName;
    },

    setUrlCode(value) {
      urlCode = String(value || "");
      return urlCode;
    },

    setLocation(value) {
      location = value || null;
      return location;
    }
  };
}
