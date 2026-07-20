import { products } from './data/products.js';

const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const STORAGE='lihen-selection-v1';
const fallback='./assets/images/lihen_logo_transparente.webp';
const short=(t='',n=105)=>t.length>n?`${t.slice(0,n).trim()}…`:t;
const safe=(v='')=>String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const getProduct=id=>products.find(p=>p.id===id);
const img=(p,i=0)=>p?.images?.[i]||p?.images?.[0]||fallback;

// Aquí presento la información económica disponible sin inventar un valor que LIHEN.CO todavía no haya confirmado.
function priceDisclosure(product) {
  const value = product?.price || 'Precio por confirmar';
  const confirmed = /\d/.test(String(value));
  return `<div class="price-disclosure"><strong>${safe(value)}</strong><small>${confirmed ? 'Impuestos incluidos cuando correspondan' : 'El precio definitivo se informará antes del pago'}</small><small>Envío no incluido · Disponibilidad sujeta a confirmación</small></div>`;
}

function loadSelection(){try{return JSON.parse(localStorage.getItem(STORAGE))||{}}catch{return {}}}
let selection=loadSelection();
function saveSelection(){localStorage.setItem(STORAGE,JSON.stringify(selection));updateSelectionUI()}
function totalUnits(){return Object.values(selection).reduce((a,b)=>a+b,0)}
function addSelection(id,qty=1){selection[id]=(selection[id]||0)+Math.max(1,qty);saveSelection();openDrawer();toast('Producto añadido a tu selección')}
function setQty(id,qty){if(qty<=0)delete selection[id];else selection[id]=qty;saveSelection()}
function selectionRows(){return Object.entries(selection).map(([id,qty])=>({product:getProduct(id),qty})).filter(x=>x.product)}
function whatsappUrl(){const rows=selectionRows();const lines=rows.map(({product,qty})=>`• ${qty} × ${product.name} (${product.brand})`);const text=`Hola LIHEN.CO, quiero consultar disponibilidad, variantes y precio final de esta selección:\n\n${lines.join('\n')}\n\nTotal de unidades: ${totalUnits()}.`;return `https://wa.me/573058947808?text=${encodeURIComponent(text)}`}

const menuToggle=$('.menu-toggle'), nav=$('.main-nav');
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',o)});}

const megaData={
 novedades:{title:'Novedades LIHEN.CO',cols:[['Lo más reciente','Ver todos','Nuevos ingresos','De nuevo disponibles','Selecciones de temporada'],['Explora','Beauty Care','Style','Ideas para regalar']],images:products.slice(0,3)},
 belleza:{title:'Beauty Care',cols:[['Maquillaje','Labios','Rostro','Ojos','Cejas y pestañas'],['Cuidado personal','Cuidado facial','Protección solar','Mascarillas','Cuidado capilar']],images:products.filter(p=>p.line==='Beauty Care').slice(0,4)},
 moda:{title:'Style',cols:[['Prendas','Conjuntos deportivos','Camisetas','Shorts','Opciones casuales'],['Encuentra tu estilo','Referencias por tono','Nuevos ingresos','De nuevo disponibles']],images:products.filter(p=>p.line==='Style').slice(0,4)},
 accesorios:{title:'Accesorios',cols:[['Complementos','Accesorios de belleza','Cosmetiqueras','Brochas y herramientas'],['Ideas prácticas','Para tu rutina','Para regalar','Ver todos']],images:products.filter(p=>/brocha|accesorio|cosmetiquera|herramienta/i.test(p.category+' '+p.name)).slice(0,4)}
};
const megaPanel=$('[data-mega-panel]'),megaContent=$('[data-mega-content]'); let megaTimer;
function renderMega(key){const d=megaData[key];if(!d||!megaPanel)return;megaContent.innerHTML=`<div class="mega-copy"><p class="eyebrow">${d.title}</p><div class="mega-columns">${d.cols.map((col,i)=>`<div><h3>${col[0]}</h3>${col.slice(1).map(x=>`<a href="${key==='moda'?'./index.html#style':key==='belleza'?'./index.html#beauty':key==='novedades'?'./index.html#novedades':'./index.html#accesorios'}">${x}</a>`).join('')}</div>`).join('')}</div></div><div class="mega-images">${d.images.map(p=>`<button type="button" data-preview="${p.id}"><img src="${img(p)}" alt="${safe(p.name)}"><span>${safe(p.name)}</span></button>`).join('')}</div>`;megaPanel.classList.add('open');megaPanel.setAttribute('aria-hidden','false')}
function closeMega(){megaPanel?.classList.remove('open');megaPanel?.setAttribute('aria-hidden','true')}
$$('[data-mega]').forEach(a=>{a.addEventListener('mouseenter',()=>{clearTimeout(megaTimer);renderMega(a.dataset.mega)});a.addEventListener('focus',()=>renderMega(a.dataset.mega))});
$('.site-header')?.addEventListener('mouseleave',()=>megaTimer=setTimeout(closeMega,150));megaPanel?.addEventListener('mouseenter',()=>clearTimeout(megaTimer));

function productCard(p){const second=img(p,1);return `<article class="product-card" data-product-id="${p.id}"><div class="product-image"><span class="tag">${safe(p.tag||p.availability||'Disponible')}</span><img class="primary" src="${img(p)}" alt="${safe(p.name)}" loading="lazy"><img class="secondary" src="${second}" alt="Otra vista de ${safe(p.name)}" loading="lazy"><div class="product-hover-actions"><button type="button" data-preview="${p.id}">Vista previa</button><button type="button" data-add="${p.id}">Agregar a mi selección</button></div></div><div class="product-info"><small>${safe(p.line)} · ${safe(p.brand)}</small><h3>${safe(p.name)}</h3><p>${safe(short(p.desc))}</p>${priceDisclosure(p)}</div></article>`}

function initCarousel(root,items){if(!root)return;const track=$('[data-track]',root),dots=$('[data-dots]',root);if(!track)return;track.innerHTML=items.map(productCard).join('');let index=0,timer;const visible=()=>innerWidth<=620?1:innerWidth<=980?2:4;const max=()=>Math.max(0,items.length-visible());function update(){index=Math.min(index,max());const first=$('.product-card',track);if(first){const gap=parseFloat(getComputedStyle(track).gap)||18;track.style.transform=`translateX(-${index*(first.getBoundingClientRect().width+gap)}px)`}if(dots){dots.innerHTML=Array.from({length:max()+1},(_,i)=>`<button class="${i===index?'active':''}" data-index="${i}" aria-label="Grupo ${i+1}"></button>`).join('')}}function next(){index=index>=max()?0:index+1;update()}function prev(){index=index<=0?max():index-1;update()}function start(){if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(next,5000)}function stop(){clearInterval(timer)}root.addEventListener('click',e=>{const b=e.target.closest('[data-index]');if(b){index=+b.dataset.index;update();stop();start()}});$('.next',root)?.addEventListener('click',()=>{next();stop();start()});$('.prev',root)?.addEventListener('click',()=>{prev();stop();start()});root.addEventListener('mouseenter',stop);root.addEventListener('mouseleave',start);let x=0;root.addEventListener('touchstart',e=>{x=e.touches[0].clientX;stop()},{passive:true});root.addEventListener('touchend',e=>{if(Math.abs(e.changedTouches[0].clientX-x)>45)(e.changedTouches[0].clientX<x?next:prev)();start()},{passive:true});addEventListener('resize',update);update();start()}

$$('[data-carousel]').forEach(root=>{let items=[];const kind=root.dataset.carousel;if(kind==='beauty')items=products.filter(p=>p.line==='Beauty Care');else if(kind==='style')items=products.filter(p=>p.line==='Style');else if(kind==='gifts')items=products.filter((_,i)=>i%3===0||i%5===0).slice(0,24);else items=products.filter(p=>!selection[p.id]).slice(0,18);initCarousel(root,items)});

// gift filters rerender carousel page
$$('[data-gift-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-gift-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const line=b.dataset.giftFilter;const list=products.filter((p,i)=>(line==='all'||p.line===line)&&(i%3===0||i%5===0)).slice(0,24);const root=$('[data-carousel="gifts"]');root?.replaceWith(root.cloneNode(true));const nr=$('[data-carousel="gifts"]');initCarousel(nr,list);$('[data-gift-count]').textContent=`${list.length} referencias`}));
if($('[data-gift-count]'))$('[data-gift-count]').textContent=`${products.filter((_,i)=>i%3===0||i%5===0).slice(0,24).length} referencias`;

let modalIndex=0,modalProduct=null;
function openModal(id){modalProduct=getProduct(id);if(!modalProduct)return;modalIndex=0;renderModal();document.body.classList.add('no-scroll')}
function renderModal(){
  // Aquí localizo el fondo del modal donde voy a presentar el producto.
  const host=$('[data-product-modal]');
  // Aquí detengo el proceso cuando falta el contenedor o el producto seleccionado.
  if(!host||!modalProduct)return;
  // Aquí hago visible el fondo del modal.
  host.hidden=false;
  // Aquí construyo la estructura una sola vez para conservar fija la apariencia del modal.
  host.innerHTML=`<section class="product-modal" role="dialog" aria-modal="true" aria-label="Vista previa de ${safe(modalProduct.name)}"><button class="modal-close" type="button" data-modal-close aria-label="Cerrar">×</button><div class="modal-gallery"><div class="modal-image-wrap"><img data-modal-gallery-image src="${img(modalProduct,modalIndex)}" alt="${safe(modalProduct.name)}"><button class="gallery-arrow left" type="button" data-gallery-prev aria-label="Imagen anterior">‹</button><button class="gallery-arrow right" type="button" data-gallery-next aria-label="Imagen siguiente">›</button></div><div class="gallery-dots" data-modal-gallery-dots>${modalProduct.images.map((_,i)=>`<button type="button" class="${i===modalIndex?'active':''}" data-gallery-index="${i}" aria-label="Imagen ${i+1}"></button>`).join('')}</div></div><div class="modal-details"><p class="eyebrow">${safe(modalProduct.line)} · ${safe(modalProduct.brand)}</p><h2>${safe(modalProduct.name)}</h2>${priceDisclosure(modalProduct)}<p>${safe(short(modalProduct.desc,310))}</p><dl><div><dt>Disponibilidad</dt><dd>${safe(modalProduct.availability)}</dd></div><div><dt>Variantes</dt><dd>${safe(modalProduct.color)}</dd></div></dl><div class="modal-add-row"><div class="qty-control"><button type="button" data-modal-minus>−</button><span data-modal-qty>1</span><button type="button" data-modal-plus>+</button></div><button class="btn btn-wine" type="button" data-modal-add>Agregar a mi selección</button></div><a class="direct-wa" href="${`https://wa.me/573058947808?text=${encodeURIComponent('Hola LIHEN.CO, quiero consultar '+modalProduct.name)}`}" target="_blank" rel="noopener">Consultar directamente por WhatsApp</a></div></section>`;
}

// Aquí cambio únicamente la fotografía y los puntos de la galería sin reconstruir el modal completo.
function updateModalGallery(){
  // Aquí localizo la imagen principal que ya está dentro del modal.
  const galleryImage=$('[data-modal-gallery-image]');
  // Aquí termino cuando la galería todavía no está disponible.
  if(!galleryImage||!modalProduct)return;
  // Aquí aplico una transición breve para que el cambio sea suave.
  galleryImage.classList.add('is-changing');
  // Aquí actualizo la ruta y el texto alternativo después de iniciar la transición.
  window.setTimeout(()=>{galleryImage.src=img(modalProduct,modalIndex);galleryImage.alt=`${modalProduct.name}, imagen ${modalIndex+1}`;galleryImage.classList.remove('is-changing')},120);
  // Aquí actualizo solamente el estado activo de los indicadores inferiores.
  document.querySelectorAll('[data-modal-gallery-dots] [data-gallery-index]').forEach((dot,i)=>dot.classList.toggle('active',i===modalIndex));
}

function closeModal(){const h=$('[data-product-modal]');if(h){h.hidden=true;h.innerHTML=''}document.body.classList.remove('no-scroll')}
document.addEventListener('click',e=>{const p=e.target.closest('[data-preview]');if(p)openModal(p.dataset.preview);const a=e.target.closest('[data-add]');if(a)addSelection(a.dataset.add,1);if(e.target.matches('[data-modal-close]')||e.target.matches('[data-product-modal]'))closeModal();if(e.target.matches('[data-gallery-prev]')){e.preventDefault();e.stopPropagation();modalIndex=(modalIndex-1+modalProduct.images.length)%modalProduct.images.length;updateModalGallery()}if(e.target.matches('[data-gallery-next]')){e.preventDefault();e.stopPropagation();modalIndex=(modalIndex+1)%modalProduct.images.length;updateModalGallery()}const gi=e.target.closest('[data-gallery-index]');if(gi){e.preventDefault();e.stopPropagation();modalIndex=+gi.dataset.galleryIndex;updateModalGallery()}if(e.target.matches('[data-modal-minus]')){const q=$('[data-modal-qty]');q.textContent=Math.max(1,+q.textContent-1)}if(e.target.matches('[data-modal-plus]')){const q=$('[data-modal-qty]');q.textContent=+q.textContent+1}if(e.target.matches('[data-modal-add]'))addSelection(modalProduct.id,+$('[data-modal-qty]').textContent)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();closeDrawer()}});

function drawerHTML(){const rows=selectionRows();const suggested=products.filter(p=>!selection[p.id]&&(!rows[0]||p.line===rows[0].product.line)).slice(0,10);return `<div class="drawer-head"><div><small>Consulta por WhatsApp</small><h2>Mi selección <span>(${totalUnits()})</span></h2></div><button data-drawer-close>×</button></div><div class="drawer-body">${rows.length?`<div class="drawer-items">${rows.map(({product,qty})=>`<article><img src="${img(product)}" alt="${safe(product.name)}"><div><h3>${safe(product.name)}</h3><small>${safe(product.brand)}</small><div class="qty-control"><button data-dec="${product.id}">−</button><span>${qty}</span><button data-inc="${product.id}">+</button></div></div><button class="remove" data-remove="${product.id}">Eliminar</button></article>`).join('')}</div>`:`<div class="empty-selection"><h3>Aún no has agregado productos.</h3><p>Explora el catálogo y crea una consulta organizada.</p></div>`}<section class="drawer-suggestions"><div class="suggest-title"><h3>¡Esto te va a interesar!</h3><div><button type="button" data-drawer-suggest-prev aria-label="Anterior">‹</button><button type="button" data-drawer-suggest-next aria-label="Siguiente">›</button></div></div><div class="mini-suggestions-viewport"><div class="mini-suggestions" data-drawer-suggest-track>${suggested.map(p=>`<article><img src="${img(p)}" alt="${safe(p.name)}"><div><strong>${safe(p.name)}</strong><button data-add="${p.id}">+ Agregar</button></div></article>`).join('')}</div></div></section></div><div class="drawer-footer"><p><strong>${totalUnits()}</strong> unidades seleccionadas</p><small>Esta selección no es una compra final. Confirmaremos disponibilidad, variantes y precio.</small><div><a class="btn btn-light" href="./mi-seleccion.html">Ver mi selección</a><a class="btn btn-wine ${rows.length?'':'disabled'}" href="${rows.length?whatsappUrl():'#'}" target="${rows.length?'_blank':'_self'}">Consultar por WhatsApp</a></div></div>`}
function openDrawer(){const d=$('[data-selection-drawer]'),bg=$('[data-drawer-backdrop]');if(!d)return;d.innerHTML=drawerHTML();d.classList.add('open');d.setAttribute('aria-hidden','false');if(bg)bg.hidden=false;document.body.classList.add('no-scroll');initDrawerSuggestions()}
let drawerSuggestTimer;
function initDrawerSuggestions(){clearInterval(drawerSuggestTimer);const track=$('[data-drawer-suggest-track]');if(!track)return;const move=(dir=1)=>{const card=track.querySelector('article');if(!card)return;const gap=parseFloat(getComputedStyle(track).gap)||10;const step=card.getBoundingClientRect().width+gap;track.scrollBy({left:dir*step,behavior:'smooth'});if(dir>0&&track.scrollLeft+track.clientWidth>=track.scrollWidth-step*1.2)track.scrollTo({left:0,behavior:'smooth'});if(dir<0&&track.scrollLeft<=step*.2)track.scrollTo({left:track.scrollWidth,behavior:'smooth'})};$('[data-drawer-suggest-next]')?.addEventListener('click',()=>move(1));$('[data-drawer-suggest-prev]')?.addEventListener('click',()=>move(-1));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)drawerSuggestTimer=setInterval(()=>move(1),5000)}
function closeDrawer(){clearInterval(drawerSuggestTimer);const d=$('[data-selection-drawer]'),bg=$('[data-drawer-backdrop]');d?.classList.remove('open');d?.setAttribute('aria-hidden','true');if(bg)bg.hidden=true;document.body.classList.remove('no-scroll')}
$$('.selection-trigger').forEach(b=>b.addEventListener('click',openDrawer));$('[data-drawer-backdrop]')?.addEventListener('click',closeDrawer);
document.addEventListener('click',e=>{if(e.target.closest('[data-drawer-close]'))closeDrawer();const inc=e.target.closest('[data-inc]');if(inc)setQty(inc.dataset.inc,(selection[inc.dataset.inc]||0)+1);const dec=e.target.closest('[data-dec]');if(dec)setQty(dec.dataset.dec,(selection[dec.dataset.dec]||0)-1);const rem=e.target.closest('[data-remove]');if(rem)setQty(rem.dataset.remove,0);if((inc||dec||rem)&&$('[data-selection-drawer].open'))openDrawer()});

function updateSelectionUI(){$$('[data-selection-count]').forEach(x=>x.textContent=`(${totalUnits()})`);renderSelectionPage()}
function renderSelectionPage(){const list=$('[data-selection-page-list]'),summary=$('[data-selection-summary]');if(!list||!summary)return;const rows=selectionRows();list.innerHTML=rows.length?`<div class="selection-table"><div class="selection-table-head"><span>Producto</span><span>Cantidad</span><span>Estado</span></div>${rows.map(({product,qty})=>`<article><img src="${img(product)}" alt="${safe(product.name)}"><div><h3>${safe(product.name)}</h3><p>${safe(product.brand)} · ${safe(product.line)}</p><button data-remove="${product.id}">Quitar</button></div><div class="qty-control"><button data-dec="${product.id}">−</button><span>${qty}</span><button data-inc="${product.id}">+</button></div>${priceDisclosure(product)}</article>`).join('')}</div>`:`<div class="empty-selection page-empty"><h2>Tu selección está vacía</h2><p>Agrega productos desde el inicio o Ideas para regalar.</p><a class="btn btn-wine" href="./index.html#beauty">Explorar productos</a></div>`;summary.innerHTML=`<h2>Resumen</h2><div><span>Referencias</span><strong>${rows.length}</strong></div><div><span>Total de unidades</span><strong>${totalUnits()}</strong></div><p>Los precios, variantes y disponibilidad se confirman por WhatsApp antes de cualquier pago.</p><a class="btn btn-wine ${rows.length?'':'disabled'}" href="${rows.length?whatsappUrl():'#'}" target="${rows.length?'_blank':'_self'}">Enviar selección por WhatsApp</a><a class="btn btn-light" href="./index.html">Seguir explorando</a>`}
function toast(text){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
updateSelectionUI();

// Aquí inicio el carrusel principal y explico que debe avanzar siempre cada tres segundos.
(function initHeroCarousel(){
  // Aquí localizo la portada que contiene todas las imágenes principales.
  const root=document.querySelector('[data-hero-carousel]');
  // Aquí termino la función cuando la página actual no incluye esta portada.
  if(!root)return;
  // Aquí evito crear dos temporizadores sobre el mismo carrusel.
  if(root.dataset.autoplayReady==='true')return;
  // Aquí marco el carrusel como preparado.
  root.dataset.autoplayReady='true';
  // Aquí reúno todas las diapositivas para poder activar una sola a la vez.
  const slides=[...root.querySelectorAll('[data-hero-slide]')];
  // Aquí localizo el contenedor donde dibujo los indicadores inferiores.
  const dots=root.querySelector('[data-hero-dots]');
  // Aquí guardo la posición actual, el temporizador y el punto inicial de un gesto táctil.
  let index=0,timer=null,touchStart=0;
  // Aquí dibujo los puntos y marco visualmente la imagen activa.
  const renderDots=()=>{if(!dots)return;dots.innerHTML=slides.map((_,i)=>`<button type="button" class="${i===index?'active':''}" data-hero-index="${i}" aria-label="Ver imagen ${i+1}"></button>`).join('')};
  // Aquí cambio únicamente la diapositiva activa sin pausar el movimiento automático.
  const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((slide,n)=>slide.classList.toggle('is-active',n===index));renderDots()};
  // Aquí preparo el avance hacia la siguiente imagen.
  const next=()=>show(index+1);
  // Aquí preparo el regreso hacia la imagen anterior.
  const prev=()=>show(index-1);
  // Aquí limpio el temporizador anterior antes de crear uno nuevo.
  const clearTimer=()=>{if(timer){clearTimeout(timer);timer=null}};
  // Aquí programo el siguiente avance exactamente tres segundos después.
  const schedule=()=>{clearTimer();timer=window.setTimeout(()=>{next();schedule()},3000)};
  // Aquí permito avanzar manualmente y luego continúo el autoplay.
  root.querySelector('[data-hero-next]')?.addEventListener('click',event=>{event.preventDefault();next();schedule()});
  // Aquí permito retroceder manualmente y luego continúo el autoplay.
  root.querySelector('[data-hero-prev]')?.addEventListener('click',event=>{event.preventDefault();prev();schedule()});
  // Aquí permito seleccionar un punto específico y luego continúo el autoplay.
  dots?.addEventListener('click',event=>{const button=event.target.closest('[data-hero-index]');if(!button)return;event.preventDefault();show(Number(button.dataset.heroIndex));schedule()});
  // Aquí guardo la posición inicial cuando la persona toca la pantalla.
  root.addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX},{passive:true});
  // Aquí interpreto el deslizamiento sin detener el temporizador permanente.
  root.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45)(delta<0?next:prev)();schedule()},{passive:true});
  // Aquí reanudo el conteo cuando la persona regresa a la pestaña del navegador.
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule()});
  // Aquí muestro la primera imagen y comienzo el movimiento automático inmediatamente.
  show(0);schedule();
})();


// ETAPA 27: pestaña promocional de bienvenida y formulario con autorización.
function mountWelcomePromo(){
  if(document.querySelector('[data-welcome-tab]'))return;
  const host=document.createElement('div');
  host.innerHTML=`<div class="welcome-tab-wrap"><button class="welcome-tab" type="button" data-welcome-tab aria-label="Abrir beneficio de bienvenida"><span>10%</span><small>BIENVENIDA</small></button><button class="welcome-tab-close" type="button" data-welcome-tab-hide aria-label="Ocultar beneficio">×</button></div><div class="welcome-modal-backdrop" data-welcome-modal hidden><section class="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><button class="welcome-modal-close" type="button" data-welcome-close aria-label="Cerrar">×</button><div class="welcome-modal-copy"><p class="eyebrow">Beneficio LIHEN.CO</p><h2 id="welcome-title">Recibe un beneficio en tu primera compra.</h2><p>Déjanos tus datos para solicitar las condiciones vigentes de la campaña.</p><form data-welcome-form><label>Correo electrónico<input type="email" name="email" required placeholder="tu@correo.com"></label><fieldset><legend>Cumpleaños <small>(opcional)</small></legend><div class="birthday-fields"><input type="number" name="month" min="1" max="12" placeholder="MM" aria-label="Mes"><input type="number" name="day" min="1" max="31" placeholder="DD" aria-label="Día"><input type="number" name="year" min="1900" max="2026" placeholder="AAAA" aria-label="Año"></div></fieldset><label class="consent-check"><input type="checkbox" name="consent" required><span>Autorizo a LIHEN.CO a contactarme sobre este beneficio y acepto la <a href="./politica-de-privacidad.html">Política de privacidad</a>.</span></label><button class="btn btn-dark" type="submit">Solicitar beneficio</button><button class="welcome-no" type="button" data-welcome-close>Ahora no</button></form><small>El beneficio está sujeto a vigencia, productos participantes y demás condiciones informadas por LIHEN.CO.</small></div><div class="welcome-modal-art"><img src="./assets/banners/lihen_beneficio_bienvenida.webp" alt="Identidad visual de LIHEN.CO para el beneficio de bienvenida"></div></section></div>`;
  document.body.append(...host.children);
  const modal=document.querySelector('[data-welcome-modal]');
  const open=()=>{modal.hidden=false;document.body.classList.add('no-scroll')};
  const close=()=>{modal.hidden=true;document.body.classList.remove('no-scroll')};
  document.querySelector('[data-welcome-tab]')?.addEventListener('click',open);
  document.querySelector('[data-welcome-tab-hide]')?.addEventListener('click',e=>{e.stopPropagation();document.querySelector('.welcome-tab-wrap')?.remove()});
  modal?.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-welcome-close]'))close()});
  document.querySelector('[data-welcome-form]')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const birth=[data.get('month'),data.get('day'),data.get('year')].filter(Boolean).join('/');const text=`Hola LIHEN.CO, deseo solicitar el beneficio de bienvenida. Correo: ${data.get('email')}.${birth?` Cumpleaños: ${birth}.`:''} Autorizo el contacto para conocer condiciones vigentes.`;window.open(`https://wa.me/573058947808?text=${encodeURIComponent(text)}`,'_blank','noopener');close()});
}
mountWelcomePromo();
