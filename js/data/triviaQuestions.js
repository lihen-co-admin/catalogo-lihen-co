export const TRIVIA_QUESTIONS = [
  { key: "identidad-luz", position: 1, question: "¿Qué representa la letra L en LIHEN.CO?", options: ["Liderazgo", "Luz", "Libertad", "Lealtad"] },
  { key: "identidad-integridad", position: 2, question: "¿Qué valor representa la letra I en LIHEN.CO?", options: ["Innovación", "Inspiración", "Integridad", "Imaginación"] },
  { key: "lineas-marca", position: 3, question: "¿Cuáles son las dos líneas principales del catálogo LIHEN.CO?", options: ["Beauty Care y Style", "Moda y Hogar", "Cosmética y Tecnología", "Accesorios y Alimentos"] },
  { key: "consulta-productos", position: 4, question: "¿Cuál es el canal preparado en la web para consultar productos?", options: ["Telegram", "Correo postal", "WhatsApp", "Llamada internacional"] },
  { key: "proposito-excelencia", position: 5, question: "¿Qué representa la letra E en LIHEN.CO?", options: ["Economía", "Elegancia", "Excelencia", "Estrategia"] }
];

export function getTriviaQuestionByKey(key) {
  return TRIVIA_QUESTIONS.find(question => question.key === key) || null;
}
