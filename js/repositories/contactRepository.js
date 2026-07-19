const REQUESTS_KEY = "lihen-contact-requests-v2";
const PROFILE_KEY = "lihen-contact-profile-v1";
const MAX_LOCAL_REQUESTS = 10;

function readJSON(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`No fue posible leer ${key}.`, error);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`No fue posible guardar ${key}.`, error);
    return false;
  }
}

export function saveLocalContactRequest(request, syncStatus = "local-pending") {
  const serialized = { ...request.toJSON(), syncStatus };
  const requests = readJSON(REQUESTS_KEY, []);
  const updatedRequests = [serialized, ...requests.filter((item) => item.id !== serialized.id)].slice(0, MAX_LOCAL_REQUESTS);
  const requestSaved = writeJSON(REQUESTS_KEY, updatedRequests);
  const profileSaved = writeJSON(PROFILE_KEY, request.customer.toJSON());
  return requestSaved && profileSaved;
}

export function updateLocalRequestSyncStatus(requestId, syncStatus) {
  const requests = readJSON(REQUESTS_KEY, []);
  const updated = requests.map((item) => item.id === requestId ? { ...item, syncStatus } : item);
  return writeJSON(REQUESTS_KEY, updated);
}

export function getSavedContactProfile() {
  return readJSON(PROFILE_KEY, null);
}

export function getLocalContactRequests() {
  return readJSON(REQUESTS_KEY, []);
}

export function clearLocalContactData() {
  localStorage.removeItem(REQUESTS_KEY);
  localStorage.removeItem(PROFILE_KEY);
}
