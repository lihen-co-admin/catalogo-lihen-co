import { getSupabaseConfig } from "../config/supabase.js";
import { LOCAL_INVITATIONS } from "../data/localInvitations.js";

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
identityForm.addEventListener("submit",async e=>{
  e.preventDefault();
  const out=document.querySelector("[data-form-message]");
  const typedName=cleanName(e.currentTarget.guestName.value);
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
});

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
