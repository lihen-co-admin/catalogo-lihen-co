export const ROULETTE_PRIZES = [
  { key: "discount_10", label: "10% de descuento", icon: "✦", fallbackStock: 5 },
  { key: "sweet", label: "Dulce", icon: "◇", fallbackStock: 10 },
  { key: "try_again", label: "Sigue intentando", icon: "↻", fallbackStock: null },
  { key: "gift", label: "Obsequio", icon: "✧", fallbackStock: 6 },
  { key: "discount_15", label: "15% de descuento", icon: "★", fallbackStock: 5 },
  { key: "try_again_2", label: "Sigue intentando", icon: "↻", fallbackStock: null }
];
export function getRouletteSegments(){ return ROULETTE_PRIZES.map((item,index)=>({...item,index})); }
