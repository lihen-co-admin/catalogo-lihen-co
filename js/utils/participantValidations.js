const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateParticipant(data){
  const errors={};
  if(data.name.trim().length<3) errors.name="Escribe tu nombre completo.";
  if(!emailPattern.test(data.email.trim())) errors.email="Escribe un correo válido.";
  if(!["presencial","virtual"].includes(data.mode)) errors.mode="Selecciona una modalidad.";
  if(data.displayName.trim().length<2) errors.displayName="Escribe el nombre que aparecerá en la sala.";
  if(data.displayName.trim().length>30) errors.displayName="Usa máximo 30 caracteres.";
  if(!data.acceptedRules) errors.acceptedRules="Debes aceptar las reglas para continuar.";
  return errors;
}
export function generateAccessCode(){return `LIH-${crypto.randomUUID().replaceAll("-","").slice(0,6).toUpperCase()}`;}
