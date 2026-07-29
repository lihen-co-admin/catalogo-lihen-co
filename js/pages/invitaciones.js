import {
  confirmInvitation,
  findInvitationByCode
} from "../invitations/invitationRepository.js?v=181";
import {
  cleanInvitationName,
  matchesInvitationName,
  normalizeInvitationCode
} from "../invitations/invitationValidators.js?v=180";
import { createInvitationView } from "../invitations/invitationView.js?v=182";

const STARTUP_ERROR_MESSAGE = "No pudimos iniciar la invitación. Recarga la página con Ctrl + F5 y vuelve a intentarlo.";

function showStartupError(error) {
  console.error("[LIHEN Invitaciones] Error de inicio:", error);
  const output = document.querySelector("[data-form-message]");
  if (output) {
    output.textContent = STARTUP_ERROR_MESSAGE;
    output.className = "form-message error";
  }
}

function initializeInvitationPage() {
  try {

    const WHATSAPP = "573058947808";
    const state = { invitation:null, mode:null, count:1, audio:null, ambienceTimer:null, ambienceNodes:[], typedName:"", urlCode:"", location:null };
    const view = createInvitationView({ qrUrl });
    const { screens } = view;
    const { message, showScreen } = view;
    function responsibleName(){ return state.invitation?.responsible || "LIHEN.CO"; }

    function buildInitialWhatsappText(){
      return `Hola LIHEN.CO, soy ${state.invitation.display_name}. Deseo confirmar mi invitación a la inauguración. Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
    }
    function whatsappUrl(text){ return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`; }
    function qrUrl(url){ return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=12&data=${encodeURIComponent(url)}`; }

    async function prepareInvitation(inv){
      state.invitation=inv;
      state.count=Math.max(1,Number(inv.named_guests||1));
      view.renderInvitation(inv, state.count);

      const virtualOnly = Boolean(inv.virtual_only);
      view.renderVirtualOnly(virtualOnly);
      if(virtualOnly && state.mode === "presencial") state.mode = null;

      const initialUrl=whatsappUrl(buildInitialWhatsappText());
      view.updateTicketQr(initialUrl);
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
      const typedName=cleanInvitationName(identityForm?.elements?.guestName?.value);
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
        const inv=await findInvitationByCode(state.urlCode);
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

    state.urlCode=normalizeInvitationCode(new URLSearchParams(location.search).get("codigo"));
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
      view.toggleModeSection(true);
      message(document.querySelector("[data-rsvp-message]"),"Confirma asistencia presencial para revelar la dirección y el mapa.");
    });

    document.querySelector("[data-agenda-toggle]").addEventListener("click",e=>{
      view.toggleAgenda(e.currentTarget);
    });

    const modeToggleButtons = document.querySelectorAll("[data-mode-toggle]");
    modeToggleButtons.forEach(btn=>btn.addEventListener("click",()=>view.toggleModeSection()));
    view.setModeToggleText(false);

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
      if(mode!=="presencial") {
        state.location=null;
        view.resetProtectedLocation();
      }
      view.renderSelectedMode(mode);
      view.updateConfirmState(state.mode);
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
    document.querySelector("[data-data-consent]").addEventListener("change",()=>view.updateConfirmState(state.mode));

    function buildWhatsappText(){
      const modeText={presencial:"confirmo mi asistencia presencial",virtual:"confirmo que deseo acompañarlos de forma virtual",no_asiste:"agradezco mi invitación y confirmo que en esta ocasión no podré acompañarlos"}[state.mode];
      const count=state.mode==="presencial"?` Asistiremos ${state.count} persona(s) en total.`:"";
      const virtual=state.mode==="virtual"?" Comprendo que la plataforma y el enlace de transmisión se compartirán posteriormente, y estaré pendiente de las redes y del grupo de WhatsApp.":"";
      const absence=state.mode==="no_asiste"?" Por favor, registren mi ausencia para organizar correctamente los cupos, actividades, premios, descuentos y beneficios destinados a los asistentes confirmados. Seguiré pendiente de las novedades y próximas oportunidades de LIHEN.CO.":"";
      return `Hola LIHEN.CO, soy ${state.invitation.display_name}. ${modeText}.${count}${virtual}${absence} Invitación realizada por ${responsibleName()}. Referencia interna: ${state.invitation.access_code}.`;
    }

    document.querySelector("[data-confirm]").addEventListener("click",async()=>{
      const out=document.querySelector("[data-rsvp-message]");
      const btn=document.querySelector("[data-confirm]");
      btn.disabled=true;
      message(out,"Guardando tu respuesta…");
      try{
        const result=await confirmInvitation({
          accessCode: state.invitation.access_code,
          mode: state.mode,
          attendees: state.count
        });
        if(state.mode==="presencial") {
          state.location=view.revealProtectedLocation(result?.location, state.mode);
        }
        message(out,state.mode==="presencial" && result?.location
          ? "Tu asistencia presencial quedó registrada. Ya puedes consultar la ubicación y confirmar desde WhatsApp."
          : "Tu respuesta quedó preparada. Confírmala desde tu WhatsApp.","success");
        view.revealWhatsapp(whatsappUrl(buildWhatsappText()));
      } catch(err) {
        message(out,err.message,"error");
        btn.disabled=false;
      }
    });

    async function startAmbience(){
      if(state.audio){
        if(state.audio.state==="suspended") await state.audio.resume();
        view.updateSoundButtons(true);
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
      view.updateSoundButtons(true);
    }
    async function stopAmbience(){
      if(state.ambienceTimer) clearInterval(state.ambienceTimer);
      state.ambienceTimer=null;
      if(state.audio && state.audio.state!=="closed") await state.audio.close();
      state.audio=null;
      state.ambienceNodes=[];
      view.updateSoundButtons(false);
    }
    document.querySelectorAll("[data-sound-toggle]").forEach(btn=>btn.addEventListener("click",async()=>{
      if(state.audio) await stopAmbience(); else await startAmbience();
    }));

    window.__LIHEN_INVITACIONES_READY__ = true;
  } catch (error) {
    showStartupError(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeInvitationPage, { once: true });
} else {
  initializeInvitationPage();
}
