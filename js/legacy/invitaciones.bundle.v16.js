/* LIHEN.CO Invitaciones V16.2 - bundle estable para GitHub Pages. */
const ENV = {
  SUPABASE_URL: "",
  SUPABASE_ANON_KEY: "",
};
function isPlaceholder(value){ return !value || value.includes("TU-") || value.includes("TU_"); }
function getSupabaseConfig(){
  const url=String(ENV.SUPABASE_URL ?? "").trim();
  const anonKey=String(ENV.SUPABASE_ANON_KEY ?? "").trim();
  return {url, anonKey, isConfigured: !isPlaceholder(url) && !isPlaceholder(anonKey)};
}

const LOCAL_INVITATIONS = [
  {
    "access_code": "LHN-DIA-003",
    "responsible": "Diana Restrepo",
    "display_name": "Erika Palomino",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-004",
    "responsible": "Diana Restrepo",
    "display_name": "Alejandra y Sary Zuluaga",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-005",
    "responsible": "Diana Restrepo",
    "display_name": "Lina Pomelo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-006",
    "responsible": "Diana Restrepo",
    "display_name": "Valentina Gómez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-007",
    "responsible": "Diana Restrepo",
    "display_name": "Mónica Ospitia",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-008",
    "responsible": "Diana Restrepo",
    "display_name": "Leydi",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Referencia interna: la de las arepas",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-009",
    "responsible": "Diana Restrepo",
    "display_name": "Yulieth Mejía",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-010",
    "responsible": "Diana Restrepo",
    "display_name": "Ana Sofía y Luciana Mejía",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-011",
    "responsible": "Diana Restrepo",
    "display_name": "Paola América",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-012",
    "responsible": "Diana Restrepo",
    "display_name": "Lorena Cosme",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-013",
    "responsible": "Diana Restrepo",
    "display_name": "Lina y Natalia Castañeda",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-014",
    "responsible": "Diana Restrepo",
    "display_name": "Julieth Toro",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-015",
    "responsible": "Diana Restrepo",
    "display_name": "Jessica Castro",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-016",
    "responsible": "Diana Restrepo",
    "display_name": "Maritza",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-017",
    "responsible": "Diana Restrepo",
    "display_name": "Syndi y Gabriela Erazo",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-018",
    "responsible": "Diana Restrepo",
    "display_name": "Gabriela Valencia",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-019",
    "responsible": "Diana Restrepo",
    "display_name": "Paola Quiroga",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-020",
    "responsible": "Diana Restrepo",
    "display_name": "Jennifer",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-021",
    "responsible": "Diana Restrepo",
    "display_name": "Claudia",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-022",
    "responsible": "Diana Restrepo",
    "display_name": "Angie y Claudia Duque",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-023",
    "responsible": "Diana Restrepo",
    "display_name": "Paula y Kathe Villegas",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-024",
    "responsible": "Diana Restrepo",
    "display_name": "Layni",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-025",
    "responsible": "Diana Restrepo",
    "display_name": "Clara",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-026",
    "responsible": "Diana Restrepo",
    "display_name": "Isis y Valentina Zea",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-DIA-027",
    "responsible": "Diana Restrepo",
    "display_name": "Melisa",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-001",
    "responsible": "Lizeth Londoño",
    "display_name": "Juan Pablo Giraldo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-002",
    "responsible": "Lizeth Londoño",
    "display_name": "Edilberto Londoño",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-003",
    "responsible": "Lizeth Londoño",
    "display_name": "Edilberto Bohórquez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-004",
    "responsible": "Lizeth Londoño",
    "display_name": "María Elena Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-005",
    "responsible": "Lizeth Londoño",
    "display_name": "María del Carmen Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-006",
    "responsible": "Lizeth Londoño",
    "display_name": "Andrea Tabares y Miguel Ángel",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Puede agregar 1 acompañante",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-007",
    "responsible": "Lizeth Londoño",
    "display_name": "Fernanda Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-008",
    "responsible": "Lizeth Londoño",
    "display_name": "Geraldine Ayala Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-009",
    "responsible": "Lizeth Londoño",
    "display_name": "Herbinson Ayala Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-010",
    "responsible": "Lizeth Londoño",
    "display_name": "Johan Ayala Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-011",
    "responsible": "Lizeth Londoño",
    "display_name": "Paola Mosquera",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-012",
    "responsible": "Lizeth Londoño",
    "display_name": "Marcela Mosquera",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-013",
    "responsible": "Lizeth Londoño",
    "display_name": "Kamila Reyes",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-014",
    "responsible": "Lizeth Londoño",
    "display_name": "Natalia Moreno",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-015",
    "responsible": "Lizeth Londoño",
    "display_name": "Zayuri Giraldo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-016",
    "responsible": "Lizeth Londoño",
    "display_name": "Arcenire Londoño",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-017",
    "responsible": "Lizeth Londoño",
    "display_name": "Anderson Osorio",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-018",
    "responsible": "Lizeth Londoño",
    "display_name": "Andrés Cardona",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-019",
    "responsible": "Lizeth Londoño",
    "display_name": "Angélica",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Brasil; apellido pendiente; probable modalidad virtual",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-020",
    "responsible": "Lizeth Londoño",
    "display_name": "Cristian Mosquera",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-021",
    "responsible": "Lizeth Londoño",
    "display_name": "David Valencia",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-023",
    "responsible": "Lizeth Londoño",
    "display_name": "Diego Franco",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-024",
    "responsible": "Lizeth Londoño",
    "display_name": "Idali Hurtado",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Vecina",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-025",
    "responsible": "Lizeth Londoño",
    "display_name": "Edwin Roa",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-026",
    "responsible": "Lizeth Londoño",
    "display_name": "Eliuth García",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-027",
    "responsible": "Lizeth Londoño",
    "display_name": "Héctor Bedoya",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-028",
    "responsible": "Lizeth Londoño",
    "display_name": "Isaac Medina",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-029",
    "responsible": "Lizeth Londoño",
    "display_name": "Jesús Flórez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-031",
    "responsible": "Lizeth Londoño",
    "display_name": "Jhonny Benavides",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-032",
    "responsible": "Lizeth Londoño",
    "display_name": "Jorge Londoño Gómez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-033",
    "responsible": "Lizeth Londoño",
    "display_name": "Kamilo Lara",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-034",
    "responsible": "Lizeth Londoño",
    "display_name": "Karen Elena Correa",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Brasil; probable modalidad virtual",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-035",
    "responsible": "Lizeth Londoño",
    "display_name": "Laura Sofía",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-036",
    "responsible": "Lizeth Londoño",
    "display_name": "Lila",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-037",
    "responsible": "Lizeth Londoño",
    "display_name": "Jhon David",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Invitación separada; puede agregar hasta 2 acompañantes",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-001",
    "responsible": "Hellen Restrepo",
    "display_name": "Yuri Montenegro",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-002",
    "responsible": "Hellen Restrepo",
    "display_name": "Lucía Santacruz",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-003",
    "responsible": "Hellen Restrepo",
    "display_name": "Gloria Anturi",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-004",
    "responsible": "Hellen Restrepo",
    "display_name": "Danna Rojas",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-005",
    "responsible": "Hellen Restrepo",
    "display_name": "Nilsa Salinas",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-006",
    "responsible": "Hellen Restrepo",
    "display_name": "Lucia Santacruz",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-007",
    "responsible": "Hellen Restrepo",
    "display_name": "Tiana",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-008",
    "responsible": "Hellen Restrepo",
    "display_name": "Brenda Popo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-009",
    "responsible": "Hellen Restrepo",
    "display_name": "Didier Ramirez",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-010",
    "responsible": "Hellen Restrepo",
    "display_name": "Laura Navarez",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-011",
    "responsible": "Hellen Restrepo",
    "display_name": "Karen Restrepo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-012",
    "responsible": "Hellen Restrepo",
    "display_name": "Valeria Hurtado",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-013",
    "responsible": "Hellen Restrepo",
    "display_name": "Angie Garcia",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-014",
    "responsible": "Hellen Restrepo",
    "display_name": "Angeli Ocampo",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-015",
    "responsible": "Hellen Restrepo",
    "display_name": "Karen Dayana Box",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-016",
    "responsible": "Hellen Restrepo",
    "display_name": "Miguel Riascos box",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-017",
    "responsible": "Hellen Restrepo",
    "display_name": "Daniela Box",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-018",
    "responsible": "Hellen Restrepo",
    "display_name": "Camila Palacio",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-019",
    "responsible": "Hellen Restrepo",
    "display_name": "Carol Moreno",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-020",
    "responsible": "Hellen Restrepo",
    "display_name": "Ana Ramirez",
    "named_guests": 3,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-021",
    "responsible": "Hellen Restrepo",
    "display_name": "Angela cartagena",
    "named_guests": 3,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-022",
    "responsible": "Hellen Restrepo",
    "display_name": "Sofia chambo",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-023",
    "responsible": "Hellen Restrepo",
    "display_name": "Sofia Bravo",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-024",
    "responsible": "Hellen Restrepo",
    "display_name": "Brayan Suescun",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-025",
    "responsible": "Hellen Restrepo",
    "display_name": "Yosef Moreno",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-026",
    "responsible": "Hellen Restrepo",
    "display_name": "Liseth Ruiz",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-027",
    "responsible": "Hellen Restrepo",
    "display_name": "Nicol Correa",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-028",
    "responsible": "Hellen Restrepo",
    "display_name": "Jeimy",
    "named_guests": 4,
    "max_attendees": 4,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-029",
    "responsible": "Hellen Restrepo",
    "display_name": "Estefany salazar",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-030",
    "responsible": "Hellen Restrepo",
    "display_name": "Laura Velazco",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-031",
    "responsible": "Hellen Restrepo",
    "display_name": "Diana Sacananbuy",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-038",
    "responsible": "Lizeth Londoño",
    "display_name": "Sirney Marin Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-HEL-032",
    "responsible": "Hellen Restrepo",
    "display_name": "Juan Carlos Restrepo Martinez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-039",
    "responsible": "Lizeth Londoño",
    "display_name": "Nelvi",
    "named_guests": 2,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-040",
    "responsible": "Lizeth Londoño",
    "display_name": "Yurani Tabares",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-041",
    "responsible": "Lizeth Londoño",
    "display_name": "Orfaneri Londoño",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-042",
    "responsible": "Lizeth Londoño",
    "display_name": "Fary Bohorquez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-043",
    "responsible": "Lizeth Londoño",
    "display_name": "Sandra Cordoba",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-044",
    "responsible": "Lizeth Londoño",
    "display_name": "Mery Bohórquez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-045",
    "responsible": "Lizeth Londoño",
    "display_name": "Angelli  Londoño",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-046",
    "responsible": "Lizeth Londoño",
    "display_name": "Steven Pelaez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-LIZ-047",
    "responsible": "Lizeth Londoño",
    "display_name": "Martha",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": true
  },
  {
    "access_code": "LHN-HEL-033",
    "responsible": "Hellen Restrepo",
    "display_name": "Esteban Bermudez",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-034",
    "responsible": "Hellen Restrepo",
    "display_name": "Evelin",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-035",
    "responsible": "Hellen Restrepo",
    "display_name": "Juan Jose",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-HEL-036",
    "responsible": "Hellen Restrepo",
    "display_name": "Erick Ramiro Sarasti",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  },
  {
    "access_code": "LHN-HEL-037",
    "responsible": "Hellen Restrepo",
    "display_name": "Heidi Sarasti",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": false
  },
  {
    "access_code": "LHN-HEL-038",
    "responsible": "Hellen Restrepo",
    "display_name": "Yaneth",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "Apellido pendiente",
    "virtual_only": true
  },
  {
    "access_code": "LHN-LIZ-048",
    "responsible": "Lizeth Londoño",
    "display_name": "Leonardo Londoño",
    "named_guests": 1,
    "max_attendees": 3,
    "status": "pending",
    "notes": "",
    "virtual_only": true
  }
];


const WHATSAPP = "573058947808";
const DEMO = { access_code:"LHN-DEMO-001", display_name:"Lizeth Londoño", responsible:"Lizeth Londoño", named_guests:1, max_attendees:3, status:"pending" };
const state = { invitation:null, mode:null, count:1, audio:null, ambienceTimer:null, ambienceNodes:[], typedName:"", urlCode:"", location:null };
const screens = Object.fromEntries([...document.querySelectorAll("[data-screen]")].map(el=>[el.dataset.screen,el]));
const guestLabels = document.querySelectorAll("[data-guest-name]");
const localInvitationMap = new Map(LOCAL_INVITATIONS.map(item=>[String(item.access_code).trim().toUpperCase(), item]));

function showScreen(name){
  Object.entries(screens).forEach(([key,el])=>{const active=key===name;el.hidden=!active;el.classList.toggle("is-active",active)});
  window.scrollTo({top:0,behavior:"smooth"});
}
function normalizeCode(v){ return String(v||"").trim().toUpperCase(); }
function cleanName(v){ return String(v||"").trim().replace(/\s+/g," "); }
function normalizeName(v){
  return cleanName(v)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[.,/#!$%^&*;:{}=_`~()¿?¡+\\-]/g, " ")
    .replace(/\s+/g," ")
    .toLowerCase();
}
function words(v){ return normalizeName(v).split(" ").filter(Boolean); }
function message(el,text,type=""){
  el.textContent=text;
  el.className=`form-message ${type}`.trim();
}
function responsibleName(){ return state.invitation?.responsible || "LIHEN.CO"; }

function buildAliases(displayName=""){
  const aliases = new Set();
  const normalizedFull = normalizeName(displayName);
  if(normalizedFull) aliases.add(normalizedFull);

  const rawParts = displayName.split(/\s+y\s+/i).map(part=>cleanName(part)).filter(Boolean);
  if(rawParts.length > 1){
    const normalizedParts = rawParts.map(part=>words(part));
    const lastPartWords = normalizedParts[normalizedParts.length - 1] || [];
    const sharedSurname = lastPartWords.length > 1 ? lastPartWords[lastPartWords.length - 1] : "";

    rawParts.forEach((part, index)=>{
      const partWords = words(part);
      if(!partWords.length) return;
      aliases.add(partWords.join(" "));

      if(partWords.length === 1 && sharedSurname){
        aliases.add(`${partWords[0]} ${sharedSurname}`.trim());
      }

      if(index === 0 && partWords.length >= 2){
        aliases.add(partWords.slice(0, Math.min(3, partWords.length)).join(" "));
      }
    });
  } else {
    const w = words(displayName);
    if(w.length){
      aliases.add(w.join(" "));
      aliases.add(w.slice(0, Math.min(3, w.length)).join(" "));
    }
  }

  return [...aliases].filter(Boolean);
}

function matchesInvitationName(typedName, invitation){
  const typed = normalizeName(typedName);
  if(!typed) return false;
  const typedWords = typed.split(" ").filter(Boolean);
  const aliases = buildAliases(invitation.display_name);

  return aliases.some(alias=>{
    const aliasWords = alias.split(" ").filter(Boolean);
    if(!aliasWords.length) return false;
    if(alias === typed) return true;
    if(alias.startsWith(typed) || typed.startsWith(alias)) return true;
    if(typedWords.length <= aliasWords.length){
      const prefixMatches = typedWords.every((word, index)=>aliasWords[index] === word);
      if(prefixMatches) return true;
    }
    return false;
  });
}

async function lookupInvitation(code){
  if(code==="LHN-DEMO-001") return DEMO;
  if(localInvitationMap.has(code)) return localInvitationMap.get(code);

  const cfg = getSupabaseConfig();
  if(!cfg.isConfigured) {
    throw new Error("No encontramos una invitación asociada a este enlace. Solicita a la persona que te invitó que te reenvíe tu enlace personal.");
  }

  const response = await fetch(`${cfg.url}/rest/v1/rpc/get_invitation_by_code`, {
    method:"POST",
    headers:{apikey:cfg.anonKey, Authorization:`Bearer ${cfg.anonKey}`, "Content-Type":"application/json"},
    body:JSON.stringify({p_code:code})
  });

  if(!response.ok) throw new Error("No pudimos validar la invitación en este momento.");
  const rows = await response.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function saveConfirmation(){
  const cfg=getSupabaseConfig();
  if(!cfg.isConfigured){
    if(state.invitation.access_code==="LHN-DEMO-001" || localInvitationMap.has(state.invitation.access_code)){
      return {ok:true, local:true, location:null};
    }
    throw new Error("Supabase no está configurado.");
  }
  const response=await fetch(`${cfg.url}/rest/v1/rpc/confirm_invitation`,{method:"POST",headers:{apikey:cfg.anonKey,Authorization:`Bearer ${cfg.anonKey}`,"Content-Type":"application/json"},body:JSON.stringify({p_code:state.invitation.access_code,p_mode:state.mode,p_attendees:state.count})});
  if(!response.ok) throw new Error("No pudimos guardar la confirmación.");
  return response.json();
}

function buildInitialWhatsappText(){
  return `Hola LIHEN.CO, soy ${state.invitation.display_name}. Deseo confirmar mi invitación a la inauguración. Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
}
function whatsappUrl(text){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`; }
function qrUrl(url){ return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(url)}`; }

async function prepareInvitation(inv){
  state.invitation=inv;
  state.count=Math.max(1,Number(inv.named_guests||1));
  guestLabels.forEach(el=>el.textContent=inv.display_name);
  const max=Math.max(state.count,Number(inv.max_attendees||3));
  document.querySelector("[data-max-attendees]").textContent=max;
  const select=document.querySelector("[data-attendee-count]");
  select.innerHTML="";
  for(let i=state.count;i<=max;i++){
    const op=document.createElement("option");
    op.value=i;
    op.textContent=`${i} ${i===1?"persona":"personas"}`;
    select.append(op);
  }
  select.value=state.count;

  const virtualOnly = Boolean(inv.virtual_only);
  const presencialButton = document.querySelector('[data-mode="presencial"]');
  const virtualNotice = document.querySelector("[data-virtual-only-notice]");
  if(presencialButton){
    presencialButton.hidden = virtualOnly;
    presencialButton.disabled = virtualOnly;
    presencialButton.setAttribute("aria-disabled", String(virtualOnly));
  }
  if(virtualNotice) virtualNotice.hidden = !virtualOnly;
  if(virtualOnly && state.mode === "presencial") state.mode = null;

  const initialUrl=whatsappUrl(buildInitialWhatsappText());
  document.querySelector("[data-ticket-qr]").src=qrUrl(initialUrl);
  await transitionToSeal();
}

async function transitionToSeal(){
  const entryScreen=screens.entry;
  const sealScreen=screens.seal;
  const discoverButton=document.querySelector("[data-discover-button]");
  discoverButton?.setAttribute("aria-busy","true");
  entryScreen.classList.add("transitioning");
  await new Promise(resolve=>setTimeout(resolve,1850));
  showScreen("seal");
  sealScreen.classList.add("arriving");
  requestAnimationFrame(()=>setTimeout(()=>sealScreen.classList.remove("arriving"),1450));
  entryScreen.classList.remove("transitioning");
  discoverButton?.removeAttribute("aria-busy");
}

function createCelebration({secondary=false}={}){
  const layer=document.querySelector("[data-celebration-layer]");
  if(!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if(!secondary) layer.replaceChildren();
  const colors=["#e8bf6a","#edc7cf","#d9afca","#f7e7c8","#c9afe7","#f2d6a2","#f7bfcf"];
  const viewportBase=Math.max(180,Math.min(window.innerWidth,window.innerHeight)*0.34);
  const total=secondary?30:48;
  for(let i=0;i<total;i++){
    const piece=document.createElement("span");
    const angle=(Math.PI*2*i/total)+(Math.random()-.5)*.34;
    const distance=viewportBase*(secondary?0.72:1)+(Math.random()*viewportBase*(secondary?0.38:0.52));
    const x=Math.cos(angle)*distance;
    const y=Math.sin(angle)*distance;
    const spark=i%3===0;
    piece.className=spark?"spark-piece":"confetti-piece";
    piece.style.setProperty("--tx",`${x}px`);
    piece.style.setProperty("--ty",`${y}px`);
    piece.style.setProperty("--rot",`${Math.round(Math.random()*1080-540)}deg`);
    piece.style.setProperty("--delay",`${(Math.random()*(secondary?0.3:0.2)).toFixed(2)}s`);
    piece.style.setProperty("--piece-color",colors[i%colors.length]);
    piece.style.setProperty("--piece-width",`${8+Math.random()*6}px`);
    piece.style.setProperty("--piece-height",`${14+Math.random()*14}px`);
    layer.append(piece);
  }
  setTimeout(()=>layer.replaceChildren(),2600);
}

const identityForm=document.querySelector("[data-identity-form]");
const discoverButton=document.querySelector("[data-discover-button]");

async function handleDiscovery(event){
  event?.preventDefault?.();
  const out=document.querySelector("[data-form-message]");
  const typedName=cleanName(identityForm?.elements?.guestName?.value);
  if(typedName.length<2){
    message(out,"Escribe tu nombre para continuar.","error");
    return;
  }
  if(!state.urlCode){
    message(out,"Este enlace no contiene una invitación válida. Solicita a la persona que te invitó que te reenvíe tu enlace personal.","error");
    return;
  }
  state.typedName=typedName;
  message(out,"Preparando tu experiencia…");
  try{
    const inv=await lookupInvitation(state.urlCode);
    if(!inv) throw new Error("No encontramos una invitación asociada a este enlace.");
    if(!matchesInvitationName(typedName, inv)){
      throw new Error("Escribe tu nombre o tus nombres y primer apellido como aparecen en tu invitación.");
    }
    await prepareInvitation(inv);
  }catch(err){
    message(out,err.message,"error");
  }
}

identityForm?.addEventListener("submit",handleDiscovery);
discoverButton?.addEventListener("click",handleDiscovery);

state.urlCode=normalizeCode(new URLSearchParams(location.search).get("codigo"));
if(!state.urlCode){
  message(document.querySelector("[data-form-message]"),"Abre el enlace personal que te envió Lizeth, Diana o Hellen.","error");
}

document.querySelector("[data-open-invitation]").addEventListener("click",async e=>{
  const button=e.currentTarget;
  if(button.classList.contains("opening")) return;
  const sealScreen=screens.seal;
  button.classList.add("opening");
  sealScreen.classList.add("revealing");
  createCelebration();
  setTimeout(()=>createCelebration({secondary:true}),950);
  await startAmbience();
  setTimeout(()=>{
    showScreen("invitation");
    sealScreen.classList.remove("revealing");
    button.classList.remove("opening");
  },2600);
});

document.querySelector("[data-location-locked]")?.addEventListener("click",()=>{
  toggleModeSection(true);
  message(document.querySelector("[data-rsvp-message]"),"Confirma asistencia presencial para revelar la dirección y el mapa.");
});

document.querySelector("[data-agenda-toggle]").addEventListener("click",e=>{
  const panel=document.querySelector("[data-agenda]");
  panel.hidden=!panel.hidden;
  e.currentTarget.textContent=panel.hidden?"Ver programación":"Ocultar programación";
});

const rsvpSection = document.getElementById("confirmacion");
const modeToggleButtons = document.querySelectorAll("[data-mode-toggle]");
function setModeToggleText(open){
  modeToggleButtons.forEach(btn=>{
    btn.textContent = open ? "Ocultar modalidad" : "Elegir modalidad";
    btn.setAttribute("aria-expanded", String(open));
  });
}
function toggleModeSection(forceOpen=null){
  const willOpen = forceOpen === null ? rsvpSection.hidden : forceOpen;
  rsvpSection.hidden = !willOpen;
  setModeToggleText(willOpen);
  if(willOpen){
    rsvpSection.scrollIntoView({behavior:"smooth", block:"start"});
  }
}
modeToggleButtons.forEach(btn=>btn.addEventListener("click",()=>toggleModeSection()));
setModeToggleText(false);

document.querySelectorAll("[data-mode]").forEach(btn=>btn.addEventListener("click",()=>{
  const mode=btn.dataset.mode;
  if(mode==="virtual"){
    document.querySelector("[data-virtual-dialog]").showModal();
    return;
  }
  if(mode==="no_asiste"){
    document.querySelector("[data-no-attend-dialog]").showModal();
    return;
  }
  selectMode(mode);
}));

function selectMode(mode){
  if(mode==="presencial" && state.invitation?.virtual_only){
    message(document.querySelector("[data-rsvp-message]"),"Esta invitación está habilitada únicamente para modalidad virtual o para registrar que no podrás acompañarnos.","error");
    return;
  }
  state.mode=mode;
  if(mode!=="presencial") resetProtectedLocation();
  document.querySelectorAll("[data-mode]").forEach(b=>b.classList.toggle("selected",b.dataset.mode===mode));
  document.querySelector("[data-attendance-box]").hidden=mode!=="presencial";
  document.querySelector("[data-whatsapp-panel]").hidden=true;
  updateConfirmState();
}

const accept=document.querySelector("[data-virtual-accept]");
accept.addEventListener("change",()=>document.querySelector("[data-virtual-confirm]").disabled=!accept.checked);
document.querySelector("[data-virtual-dialog]").addEventListener("close",e=>{
  if(e.currentTarget.returnValue==="confirm") selectMode("virtual");
  accept.checked=false;
  document.querySelector("[data-virtual-confirm]").disabled=true;
});

const noAttendAccept=document.querySelector("[data-no-attend-accept]");
const noAttendConfirm=document.querySelector("[data-no-attend-confirm]");
const noAttendDialog=document.querySelector("[data-no-attend-dialog]");
noAttendAccept.addEventListener("change",()=>noAttendConfirm.disabled=!noAttendAccept.checked);
noAttendDialog.addEventListener("close",e=>{
  if(e.currentTarget.returnValue==="confirm") selectMode("no_asiste");
  noAttendAccept.checked=false;
  noAttendConfirm.disabled=true;
});
document.querySelector("[data-attendee-count]").addEventListener("change",e=>state.count=Number(e.target.value));
document.querySelector("[data-data-consent]").addEventListener("change",updateConfirmState);
function updateConfirmState(){ document.querySelector("[data-confirm]").disabled=!(state.mode&&document.querySelector("[data-data-consent]").checked); }


function revealProtectedLocation(locationData){
  if(!locationData || state.mode!=="presencial") return;
  const address=String(locationData.address||"").trim();
  const mapsUrl=String(locationData.maps_url||"").trim();
  if(!address || !mapsUrl) return;
  state.location={address,maps_url:mapsUrl};
  const summary=document.querySelector("[data-location-summary]");
  const locked=document.querySelector("[data-location-locked]");
  const link=document.querySelector("[data-location-link]");
  const notice=document.querySelector("[data-location-notice]");
  if(summary) summary.textContent=address;
  if(locked) locked.hidden=true;
  if(link){ link.href=mapsUrl; link.hidden=false; }
  if(notice) notice.textContent="Tu asistencia presencial quedó registrada. Ya puedes consultar la ubicación confirmada.";
}

function resetProtectedLocation(){
  state.location=null;
  const summary=document.querySelector("[data-location-summary]");
  const locked=document.querySelector("[data-location-locked]");
  const link=document.querySelector("[data-location-link]");
  const notice=document.querySelector("[data-location-notice]");
  if(summary) summary.textContent="Se revelará únicamente después de confirmar asistencia presencial.";
  if(locked) locked.hidden=false;
  if(link){ link.hidden=true; link.removeAttribute("href"); }
  if(notice) notice.textContent="Por seguridad, la dirección y el acceso al mapa solo se mostrarán después de registrar una confirmación presencial.";
}

function buildWhatsappText(){
  const modeText={presencial:"confirmo mi asistencia presencial",virtual:"confirmo que deseo acompañarlos de forma virtual",no_asiste:"agradezco mi invitación y confirmo que en esta ocasión no podré acompañarlos"}[state.mode];
  const count=state.mode==="presencial"?` Asistiremos ${state.count} persona(s) en total.`:"";
  const virtual=state.mode==="virtual"?" Comprendo que la plataforma y el enlace de transmisión se compartirán posteriormente, y estaré pendiente de las redes y del grupo de WhatsApp.":"";
  const absence=state.mode==="no_asiste"?" Por favor, registren mi ausencia para organizar correctamente los cupos, actividades, premios, descuentos y beneficios destinados a los asistentes confirmados. Seguiré pendiente de las novedades y próximas oportunidades de LIHEN.CO.":"";
  return `Hola LIHEN.CO, soy ${state.invitation.display_name}. ${modeText}.${count}${virtual}${absence} Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
}

function revealWhatsapp(){
  const url=whatsappUrl(buildWhatsappText());
  const link=document.querySelector("[data-whatsapp-link]");
  link.href=url;
  document.querySelector("[data-whatsapp-qr]").src=qrUrl(url);
  document.querySelector("[data-ticket-qr]").src=qrUrl(url);
  const panel=document.querySelector("[data-whatsapp-panel]");
  panel.hidden=false;
  panel.scrollIntoView({behavior:"smooth",block:"center"});
}

document.querySelector("[data-confirm]").addEventListener("click",async()=>{
  const out=document.querySelector("[data-rsvp-message]");
  const btn=document.querySelector("[data-confirm]");
  btn.disabled=true;
  message(out,"Guardando tu respuesta…");
  try{
    const result=await saveConfirmation();
    if(state.mode==="presencial") revealProtectedLocation(result?.location);
    message(out,state.mode==="presencial" && result?.location
      ? "Tu asistencia presencial quedó registrada. Ya puedes consultar la ubicación y confirmar desde WhatsApp."
      : "Tu respuesta quedó preparada. Confírmala desde tu WhatsApp.","success");
    revealWhatsapp();
  } catch(err) {
    message(out,err.message,"error");
    btn.disabled=false;
  }
});

function updateSoundButtons(active){
  document.querySelectorAll("[data-sound-toggle]").forEach(btn=>{
    btn.textContent=active?"♫ Pausar ambiente":"♫ Activar ambiente";
    btn.setAttribute("aria-pressed",String(active));
  });
}
async function startAmbience(){
  if(state.audio){
    if(state.audio.state==="suspended") await state.audio.resume();
    updateSoundButtons(true);
    return;
  }
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx) return;
  const ctx=new AudioCtx();
  state.audio=ctx;
  if(ctx.state==="suspended") await ctx.resume();

  const master=ctx.createGain();
  master.gain.setValueAtTime(.085,ctx.currentTime);
  master.connect(ctx.destination);
  state.ambienceNodes=[master];

  const chordSets=[
    [261.63,329.63,392.00],
    [220.00,277.18,329.63],
    [246.94,311.13,369.99],
    [196.00,246.94,329.63]
  ];
  let chordIndex=0;
  const playPad=()=>{
    if(!state.audio || ctx.state==="closed") return;
    const now=ctx.currentTime;
    const chord=chordSets[chordIndex++%chordSets.length];
    chord.forEach((frequency,index)=>{
      const osc=ctx.createOscillator();
      const gain=ctx.createGain();
      const filter=ctx.createBiquadFilter();
      osc.type=index===0?"sine":"triangle";
      osc.frequency.value=frequency/2;
      osc.detune.value=(index-1)*4;
      filter.type="lowpass";
      filter.frequency.value=900;
      gain.gain.setValueAtTime(.0001,now);
      gain.gain.exponentialRampToValueAtTime(index===0?.22:.13,now+1.2);
      gain.gain.exponentialRampToValueAtTime(.0001,now+5.8);
      osc.connect(filter);filter.connect(gain);gain.connect(master);
      osc.start(now);osc.stop(now+6);
    });
    const bell=ctx.createOscillator();
    const bellGain=ctx.createGain();
    bell.type="sine";
    bell.frequency.value=523.25*(chordIndex%2?1:1.5);
    bellGain.gain.setValueAtTime(.0001,now+.4);
    bellGain.gain.exponentialRampToValueAtTime(.11,now+.48);
    bellGain.gain.exponentialRampToValueAtTime(.0001,now+2.8);
    bell.connect(bellGain);bellGain.connect(master);bell.start(now+.4);bell.stop(now+3);
  };
  playPad();
  state.ambienceTimer=setInterval(playPad,5200);
  updateSoundButtons(true);
}
async function stopAmbience(){
  if(state.ambienceTimer) clearInterval(state.ambienceTimer);
  state.ambienceTimer=null;
  if(state.audio && state.audio.state!=="closed") await state.audio.close();
  state.audio=null;
  state.ambienceNodes=[];
  updateSoundButtons(false);
}
document.querySelectorAll("[data-sound-toggle]").forEach(btn=>btn.addEventListener("click",async()=>{
  if(state.audio) await stopAmbience(); else await startAmbience();
}));

window.__LIHEN_INVITACIONES_READY__ = true;
