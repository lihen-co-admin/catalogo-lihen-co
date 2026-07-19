const FULL_TURN = 360;
export function rotationForSegment(index,total,currentRotation=0){
  const slice=FULL_TURN/total;
  const center=index*slice+slice/2;
  const normalized=((currentRotation%FULL_TURN)+FULL_TURN)%FULL_TURN;
  return currentRotation+(FULL_TURN-normalized)+FULL_TURN*6+(FULL_TURN-center);
}
export function paintRouletteWheel(element,segments){
  if(!element||!segments.length)return;
  const slice=360/segments.length;
  const stops=segments.map((_,i)=>`${i%2?"#ead9c5":"#c99375"} ${i*slice}deg ${(i+1)*slice}deg`).join(",");
  element.style.background=`conic-gradient(from -${slice/2}deg, ${stops})`;
  element.innerHTML=segments.map((segment,i)=>{const angle=i*slice;return `<span class="roulette-label" style="--angle:${angle}deg"><b>${segment.icon}</b><small>${segment.label}</small></span>`}).join("");
}
export function spinWheel(element,targetRotation,duration=4600){
  if(!element)return Promise.resolve();
  element.style.setProperty("--spin-duration",`${duration}ms`);
  requestAnimationFrame(()=>element.style.transform=`rotate(${targetRotation}deg)`);
  return new Promise(resolve=>setTimeout(resolve,duration+120));
}
