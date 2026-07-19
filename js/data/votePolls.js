export const VOTE_POLLS = [
  {
    key: "favorite-line",
    position: 1,
    question: "¿Cuál línea de LIHEN.CO te representa más?",
    options: [
      { key: "beauty-care", label: "Beauty Care", description: "Belleza, cuidado personal y detalles que resaltan tu esencia." },
      { key: "style", label: "Style", description: "Moda, accesorios y elementos para expresar tu estilo." }
    ]
  },
  {
    key: "favorite-value",
    position: 2,
    question: "¿Qué valor de LIHEN.CO conecta más contigo?",
    options: [
      { key: "luz", label: "Luz", description: "Inspirar, guiar y reflejar buenas obras." },
      { key: "integridad", label: "Integridad", description: "Actuar con verdad, transparencia y coherencia." },
      { key: "excelencia", label: "Excelencia", description: "Servir con amor, orden y responsabilidad." },
      { key: "nobleza", label: "Nobleza", description: "Crecer cuidando a las personas y evitando la vanidad." }
    ]
  },
  {
    key: "favorite-experience",
    position: 3,
    question: "¿Qué experiencia te gustaría vivir primero con LIHEN.CO?",
    options: [
      { key: "asesoria", label: "Asesoría personalizada", description: "Recibir orientación según mis gustos y necesidades." },
      { key: "novedades", label: "Conocer novedades", description: "Descubrir productos, colecciones y lanzamientos." },
      { key: "eventos", label: "Participar en eventos", description: "Vivir experiencias presenciales y virtuales." }
    ]
  }
];

export function getVotePoll(key) {
  return VOTE_POLLS.find(poll => poll.key === key) || null;
}
