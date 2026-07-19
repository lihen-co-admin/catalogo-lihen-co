const STORAGE_KEY="lihen_inauguration_participant_v1";
export function saveLocalParticipant(participant){localStorage.setItem(STORAGE_KEY,JSON.stringify(participant));return participant;}
export function getLocalParticipant(){try{const value=JSON.parse(localStorage.getItem(STORAGE_KEY));return value&&typeof value==="object"?value:null;}catch{return null;}}
export function removeLocalParticipant(){localStorage.removeItem(STORAGE_KEY);}
