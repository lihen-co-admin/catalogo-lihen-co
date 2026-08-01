import { products } from './data/products.js';
import { initCarousel } from './modules/carousel.js';
import { initProductModal } from './modules/productModal.js';

/*
  Busco un elemento de forma segura.
  Si una página no contiene el bloque solicitado, devuelvo null
  y permito que el resto de la tienda continúe funcionando.
*/
const $ = function (selector, contenedor = document) {
  if (!contenedor || typeof contenedor.querySelector !== 'function') {
    return null;
  }

  return contenedor.querySelector(selector);
};

/*
  Busco varios elementos de forma segura.
  Cuando el contenedor no existe, devuelvo un array vacío.
*/
const $$ = function (selector, contenedor = document) {
  if (!contenedor || typeof contenedor.querySelectorAll !== 'function') {
    return [];
  }

  return [...contenedor.querySelectorAll(selector)];
};
const STORAGE='lihen-selection-v2';
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

/*
  Recupero la selección guardada y valido su estructura.
  Así evito que datos dañados o antiguos detengan el renderizado.
*/
function loadSelection() {
  try {
    const savedSelection = JSON.parse(localStorage.getItem(STORAGE));

    if (!savedSelection || Array.isArray(savedSelection) || typeof savedSelection !== 'object') {
      return {};
    }

    const validSelection = {};

    Object.entries(savedSelection).forEach(([id, quantity]) => {
      const numericQuantity = Number(quantity);

      if (getProduct(id) && Number.isInteger(numericQuantity) && numericQuantity > 0) {
        validSelection[id] = numericQuantity;
      }
    });

    return validSelection;
  } catch (error) {
    console.warn('No pude recuperar la selección guardada. Iniciaré una selección vacía.', error);
    return {};
  }
}

let selection=loadSelection();

/*
  Guardo la selección sin detener la tienda si el navegador
  bloquea temporalmente localStorage.
*/
function saveSelection(change = {}) {
  try {
    localStorage.setItem(STORAGE, JSON.stringify(selection));
  } catch (error) {
    console.warn('No pude guardar la selección en este navegador.', error);
  }

  updateSelectionUI(change);
}

function totalUnits(){return Object.values(selection).reduce((a,b)=>a+b,0)}
function addSelection(id,qty=1){selection[id]=(selection[id]||0)+Math.max(1,qty);saveSelection({id:id,structural:true});openDrawer();toast('Producto añadido a tu selección')}
function setQty(id,qty){const existed=Boolean(selection[id]);if(qty<=0)delete selection[id];else selection[id]=qty;saveSelection({id:id,structural:!existed||qty<=0})}
function selectionRows(){return Object.entries(selection).map(([id,qty])=>({product:getProduct(id),qty})).filter(x=>x.product)}
const OFFICIAL_WHATSAPP_URL='https://wa.me/message/2JDWBH57SQG4F1';
function copyWhatsAppMessage(text){navigator.clipboard?.writeText(text).catch(()=>{});}
function whatsappUrl(){const rows=selectionRows();const lines=rows.map(({product,qty})=>`• ${qty} × ${product.name} (${product.brand})`);const text=`Hola LIHEN.CO, quiero consultar disponibilidad, variantes y precio final de esta selección:\n\n${lines.join('\n')}\n\nTotal de unidades: ${totalUnits()}.`;copyWhatsAppMessage(text);return OFFICIAL_WHATSAPP_URL}

const menuToggle=$('.menu-toggle'), nav=$('.main-nav');
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const o=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',o)});}

const normalizeLabel=(value='')=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const searchHref=(params={})=>{const query=new URLSearchParams(params);return `./buscar.html?${query.toString()}`};
const megaData={
 novedades:{title:'Novedades LIHEN.CO',cols:[['Lo más reciente',['Ver todos',searchHref({view:'all'})],['Nuevos ingresos',searchHref({status:'nuevo'})],['De nuevo disponibles',searchHref({status:'restock'})],['Selecciones de temporada',searchHref({status:'temporada'})]],['Explora',['Beauty Care',searchHref({line:'Beauty Care'})],['Style',searchHref({line:'Style'})],['Ideas para regalar','./ideas-para-regalar.html']]],images:products.slice(0,3)},
 belleza:{title:'Beauty Care',cols:[['Maquillaje',['Labios',searchHref({line:'Beauty Care',category:'labios'})],['Rostro',searchHref({line:'Beauty Care',category:'rostro'})],['Ojos',searchHref({line:'Beauty Care',category:'ojos'})],['Cejas y pestañas',searchHref({line:'Beauty Care',category:'cejas y pestañas'})]],['Cuidado personal',['Cuidado facial',searchHref({line:'Beauty Care',category:'cuidado facial'})],['Protección solar',searchHref({line:'Beauty Care',category:'proteccion solar'})],['Mascarillas',searchHref({line:'Beauty Care',category:'mascarillas'})],['Cuidado capilar',searchHref({line:'Beauty Care',category:'cuidado capilar'})]]],images:products.filter(p=>p.line==='Beauty Care').slice(0,4)},
 moda:{title:'Style',cols:[['Prendas',['Conjuntos deportivos',searchHref({line:'Style',category:'conjunto'})],['Camisetas',searchHref({line:'Style',category:'camiseta'})],['Shorts',searchHref({line:'Style',category:'short'})],['Opciones casuales',searchHref({line:'Style',category:'casual'})]],['Encuentra tu estilo',['Referencias por tono',searchHref({line:'Style',category:'tono'})],['Nuevos ingresos',searchHref({line:'Style',status:'nuevo'})],['De nuevo disponibles',searchHref({line:'Style',status:'restock'})]]],images:products.filter(p=>p.line==='Style').slice(0,4)},
 accesorios:{title:'Accesorios',cols:[['Complementos',['Accesorios de belleza',searchHref({category:'accesorio'})],['Cosmetiqueras',searchHref({category:'cosmetiquera'})],['Brochas y herramientas',searchHref({category:'brocha herramienta'})]],['Ideas prácticas',['Para tu rutina',searchHref({category:'rutina'})],['Para regalar','./ideas-para-regalar.html'],['Ver todos',searchHref({category:'accesorio'})]]],images:products.filter(p=>/brocha|accesorio|cosmetiquera|herramienta/i.test(`${p.category} ${p.name}`)).slice(0,4)}
};
const megaPanel=$('[data-mega-panel]'),megaContent=$('[data-mega-content]'); let megaTimer,activeMegaKey='';
function renderMega(key){
  const d=megaData[key];
  if(!d||!megaPanel||!megaContent)return;
  if(activeMegaKey!==key){
    activeMegaKey=key;
    megaContent.innerHTML=`<div class="mega-copy"><p class="eyebrow">${d.title}</p><div class="mega-columns">${d.cols.map(col=>`<div><h3>${col[0]}</h3>${col.slice(1).map(item=>`<a href="${item[1]}">${item[0]}</a>`).join('')}</div>`).join('')}</div></div><div class="mega-images">${d.images.map(p=>`<button type="button" data-preview="${p.id}"><img src="${img(p)}" alt="${safe(p.name)}" loading="lazy" decoding="async"><span>${safe(p.name)}</span></button>`).join('')}</div>`;
  }
  megaPanel.classList.add('open');
  megaPanel.setAttribute('aria-hidden','false');
}
function closeMega(){megaPanel?.classList.remove('open');megaPanel?.setAttribute('aria-hidden','true')}
$$('[data-mega]').forEach(a=>{a.addEventListener('mouseenter',()=>{clearTimeout(megaTimer);renderMega(a.dataset.mega)});a.addEventListener('focus',()=>renderMega(a.dataset.mega))});
$('.site-header')?.addEventListener('mouseleave',()=>megaTimer=setTimeout(closeMega,150));megaPanel?.addEventListener('mouseenter',()=>clearTimeout(megaTimer));

// Aquí cargo la segunda fotografía únicamente cuando la persona interactúa con la tarjeta.
document.addEventListener('pointerover',event=>{
  const card=event.target.closest('.product-card');
  if(!card)return;
  const secondary=card.querySelector('img.secondary[data-secondary-src]');
  if(!secondary)return;
  secondary.src=secondary.dataset.secondarySrc;
  secondary.removeAttribute('data-secondary-src');
},{passive:true});

function productCard(p){const second=img(p,1);return `<article class="product-card" data-product-id="${p.id}"><div class="product-image"><img class="primary" src="${img(p)}" alt="${safe(p.name)}" loading="lazy" decoding="async"><img class="secondary" data-secondary-src="${second}" alt="Otra vista de ${safe(p.name)}" loading="lazy" decoding="async"><div class="product-hover-actions"><button type="button" data-preview="${p.id}">Vista previa</button><button type="button" data-add="${p.id}">Agregar a mi selección</button></div></div><div class="product-info"><small>${safe(p.line)} · ${safe(p.brand)}</small><h3>${safe(p.name)}</h3>${priceDisclosure(p)}</div></article>`}

// El control reutilizable de carruseles se encuentra en js/modules/carousel.js.

// Mantengo las secciones visuales de la portada conectadas al catálogo real.
(function hydrateHomeShowcase(){
  const beauty=products.filter(p=>p.line==='Beauty Care');
  const style=products.filter(p=>p.line==='Style');
  if(!beauty.length||!style.length)return;
  const care=beauty.filter(p=>/cuidado|capilar|corporal|facial|shampoo|gel|loción|bronceador|tónico|mascarilla/i.test(`${p.category} ${p.name}`));
  const makeup=beauty.filter(p=>/maquillaje|gloss|labial|pestañina|polvo|corrector|bloom/i.test(`${p.category} ${p.name}`));
  const shuffled=list=>[...list].sort(()=>Math.random()-.5);
  const pick=(list,fallbackList=beauty)=>shuffled(list.length?list:fallbackList)[0];
  const setImage=(element,product,imageIndex=0)=>{if(!element||!product)return;element.src=img(product,imageIndex);element.alt=product.name;element.loading='lazy';element.decoding='async'};

  const beautyCampaign=$('[data-campaign="beauty"]');
  setImage($('[data-campaign-main]',beautyCampaign),pick(care));
  setImage($('[data-campaign-detail]',beautyCampaign),pick(makeup));
  const styleCampaign=$('[data-campaign="style"]');
  const stylePicks=shuffled(style).slice(0,2);
  setImage($('[data-campaign-main]',styleCampaign),stylePicks[0]);
  setImage($('[data-campaign-detail]',styleCampaign),stylePicks[1]||stylePicks[0],1);

  const categoryMap={
    beauty:pick(makeup),care:pick(care),style:pick(style),
    'style-alt':pick(style.filter(p=>/conjunto|enterizo|vestido|chaqueta/i.test(p.name)),style),
    community:pick([...beauty,...style]),gift:pick([...makeup,...style])
  };
  $$('[data-category-image]').forEach(link=>setImage($('img',link),categoryMap[link.dataset.categoryImage]));

  const restock=$('[data-home-restock]');
  if(restock){
    const featured=[pick(style),pick(makeup),pick(style.filter(p=>/conjunto|enterizo|vestido|chaqueta/i.test(p.name)),style)];
    const labels=['De vuelta ✦','Regresó ✦','Nuevas unidades ✦'];
    restock.innerHTML=featured.map((p,i)=>`<article><span class="restock-badge">${labels[i]}</span><img src="${img(p)}" alt="${safe(p.name)}" loading="lazy" decoding="async"><div><small>${safe(p.line)}</small><h3>${safe(p.name)}</h3><a href="https://wa.me/message/2JDWBH57SQG4F1" target="_blank" rel="noopener noreferrer">Consultar</a></div></article>`).join('');
  }

  const social=$('[data-home-social]');
  if(social){
    const cards=[pick(care),pick(style),pick(makeup),pick(style.filter(p=>/hombre|niño/i.test(`${p.category} ${p.name}`)),style)];
    const captions=['Pequeños rituales de cuidado que hacen la diferencia.','Estilo cómodo, versátil y pensado para tu ritmo.','Productos de belleza para acompañar tu rutina.','Opciones Style para distintas formas de expresarte.'];
    social.innerHTML=cards.map((p,i)=>`<article class="swap-card"><div class="swap-media"><img class="primary" src="${img(p)}" alt="${safe(p.name)}" loading="lazy" decoding="async"><img class="secondary" src="${img(p,1)}" alt="Otra vista de ${safe(p.name)}" loading="lazy" decoding="async"></div><p>${captions[i]}</p></article>`).join('');
  }
})();

const priceNumber=product=>{const raw=String(product?.price||'').replace(/[^0-9]/g,'');return raw?Number(raw):NaN};
const giftProducts=products
  .filter(product=>{const price=priceNumber(product);return Number.isFinite(price)&&price>0&&price<=30000})
  .sort((a,b)=>priceNumber(a)-priceNumber(b));

// Inicializo cada carrusel una sola vez.
$$('[data-carousel]').forEach(root=>{
  const kind=root.dataset.carousel;
  if(kind==='gifts')return;
  const items=kind==='beauty'
    ? products.filter(product=>product.line==='Beauty Care')
    : kind==='style'
      ? products.filter(product=>product.line==='Style')
      : products.filter(product=>!selection[product.id]).slice(0,18);
  initCarousel(root,items,productCard);
});

// Ideas para regalar usa la misma fuente de productos y una sola instancia controlada.
(function initGiftCatalog(){
  const root=$('[data-carousel="gifts"]');
  if(!root)return;
  const controller=initCarousel(root,[],productCard);
  const count=$('[data-gift-count]');
  const buttons=$$('[data-gift-filter]');
  const render=line=>{
    const list=giftProducts.filter(product=>line==='all'||product.line===line);
    controller.update(list);
    root.dataset.emptyMessage=list.length?'':`No hay productos ${line==='all'?'':line+' '}de hasta $30.000 COP.`;
    root.classList.toggle('is-empty',list.length===0);
    if(count)count.textContent=`${list.length} referencia${list.length===1?'':'s'} hasta $30.000 COP`;
    buttons.forEach(button=>{
      const active=button.dataset.giftFilter===line;
      button.classList.toggle('active',active);
      button.setAttribute('aria-pressed',String(active));
    });
  };
  buttons.forEach(button=>button.addEventListener('click',()=>render(button.dataset.giftFilter)));
  render('all');
})();

// Inicio el módulo de vista previa y le comparto únicamente las funciones que necesita.
const productModal = initProductModal({
  getProduct: getProduct,
  imageFor: img,
  safe: safe,
  short: short,
  priceDisclosure: priceDisclosure,
  onAdd: addSelection
});

// Mantengo el evento para agregar productos desde las tarjetas del catálogo.
document.addEventListener('click', function (event) {
  const addButton = event.target.closest('[data-add]');

  if (!addButton) {
    return;
  }

  addSelection(addButton.dataset.add, 1);
  const originalText = addButton.textContent;
  addButton.classList.add('is-confirmed');
  addButton.textContent = 'Añadido';

  window.setTimeout(function () {
    addButton.classList.remove('is-confirmed');
    addButton.textContent = originalText;
  }, 1100);
});

function drawerItemsHTML(rows){return rows.length?`<div class="drawer-items">${rows.map(({product,qty})=>`<article data-selection-item="${product.id}"><img src="${img(product)}" alt="${safe(product.name)}" loading="lazy" decoding="async"><div><h3>${safe(product.name)}</h3><small>${safe(product.brand)}</small><div class="qty-control"><button data-dec="${product.id}">−</button><span data-selection-qty="${product.id}">${qty}</span><button data-inc="${product.id}">+</button></div></div><button class="remove" data-remove="${product.id}">Eliminar</button></article>`).join('')}</div>`:`<div class="empty-selection"><h3>Aún no has agregado productos.</h3><p>Explora el catálogo y crea una consulta organizada.</p></div>`}
function drawerSuggestionsHTML(rows){const suggested=products.filter(p=>!selection[p.id]&&(!rows[0]||p.line===rows[0].product.line)).slice(0,10);return `<section class="drawer-suggestions"><div class="suggest-title"><h3>¡Esto te va a interesar!</h3><div><button type="button" data-drawer-suggest-prev aria-label="Anterior">‹</button><button type="button" data-drawer-suggest-next aria-label="Siguiente">›</button></div></div><div class="mini-suggestions-viewport"><div class="mini-suggestions" data-drawer-suggest-track>${suggested.map(p=>`<article><img src="${img(p)}" alt="${safe(p.name)}" loading="lazy" decoding="async"><div><strong>${safe(p.name)}</strong><button data-add="${p.id}">+ Agregar</button></div></article>`).join('')}</div></div></section>`}
function drawerFooterHTML(rows){return `<p><strong data-drawer-total>${totalUnits()}</strong> unidades seleccionadas</p><small>Esta selección no es una compra final. Confirmaremos disponibilidad, variantes y precio.</small><div><a class="btn btn-light" href="./mi-seleccion.html">Ver mi selección</a><button class="btn btn-lilac ${rows.length?'':'disabled'}" type="button" data-whatsapp-selection ${rows.length?'':'disabled'}>Consultar por WhatsApp</button></div>`}
function drawerHTML(){const rows=selectionRows();return `<div class="drawer-head"><div><small>Consulta por WhatsApp</small><h2>Mi selección <span data-drawer-count>(${totalUnits()})</span></h2></div><button data-drawer-close>×</button></div><div class="drawer-body"><div data-drawer-items-host>${drawerItemsHTML(rows)}</div>${drawerSuggestionsHTML(rows)}</div><div class="drawer-footer" data-drawer-footer>${drawerFooterHTML(rows)}</div>`}
function openDrawer(){const d=$('[data-selection-drawer]'),bg=$('[data-drawer-backdrop]');if(!d)return;d.innerHTML=drawerHTML();d.classList.add('open');d.setAttribute('aria-hidden','false');if(bg)bg.hidden=false;document.body.classList.add('no-scroll');initDrawerSuggestions()}
let drawerSuggestTimer;
function initDrawerSuggestions(){clearInterval(drawerSuggestTimer);const track=$('[data-drawer-suggest-track]');if(!track)return;const move=(dir=1)=>{const card=track.querySelector('article');if(!card)return;const gap=parseFloat(getComputedStyle(track).gap)||10;const step=card.getBoundingClientRect().width+gap;track.scrollBy({left:dir*step,behavior:'smooth'});if(dir>0&&track.scrollLeft+track.clientWidth>=track.scrollWidth-step*1.2)track.scrollTo({left:0,behavior:'smooth'});if(dir<0&&track.scrollLeft<=step*.2)track.scrollTo({left:track.scrollWidth,behavior:'smooth'})};$('[data-drawer-suggest-next]')?.addEventListener('click',()=>move(1));$('[data-drawer-suggest-prev]')?.addEventListener('click',()=>move(-1));if(!matchMedia('(prefers-reduced-motion: reduce)').matches)drawerSuggestTimer=setInterval(()=>move(1),5000)}
function updateOpenDrawer(change={}){const drawer=$('[data-selection-drawer].open');if(!drawer)return;const rows=selectionRows();if(change.structural){clearInterval(drawerSuggestTimer);const itemsHost=$('[data-drawer-items-host]',drawer);const body=$('.drawer-body',drawer);const oldSuggestions=$('.drawer-suggestions',drawer);if(itemsHost)itemsHost.innerHTML=drawerItemsHTML(rows);if(body&&oldSuggestions)oldSuggestions.outerHTML=drawerSuggestionsHTML(rows);const footer=$('[data-drawer-footer]',drawer);if(footer)footer.innerHTML=drawerFooterHTML(rows);initDrawerSuggestions();}else if(change.id){$$(`[data-selection-qty="${change.id}"]`,drawer).forEach(element=>element.textContent=selection[change.id]||0);const total=$('[data-drawer-total]',drawer);if(total)total.textContent=totalUnits();}const count=$('[data-drawer-count]',drawer);if(count)count.textContent=`(${totalUnits()})`}
function closeDrawer(){clearInterval(drawerSuggestTimer);const d=$('[data-selection-drawer]'),bg=$('[data-drawer-backdrop]');d?.classList.remove('open');d?.setAttribute('aria-hidden','true');if(bg)bg.hidden=true;document.body.classList.remove('no-scroll')}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeDrawer();
  }
});

window.LIHENStorefront = {
  openProduct: productModal.open,
  addProduct: addSelection,
  openSelection: openDrawer
};
$$('.selection-trigger').forEach(b=>b.addEventListener('click',openDrawer));$('[data-drawer-backdrop]')?.addEventListener('click',closeDrawer);
document.addEventListener('click',e=>{if(e.target.closest('[data-drawer-close]'))closeDrawer();const inc=e.target.closest('[data-inc]');if(inc)setQty(inc.dataset.inc,(selection[inc.dataset.inc]||0)+1);const dec=e.target.closest('[data-dec]');if(dec)setQty(dec.dataset.dec,(selection[dec.dataset.dec]||0)-1);const rem=e.target.closest('[data-remove]');if(rem)setQty(rem.dataset.remove,0)});

// Envío la selección al canal oficial de WhatsApp sin depender de la inauguración.
document.addEventListener('click',event=>{const trigger=event.target.closest('[data-whatsapp-selection]');if(!trigger||trigger.disabled)return;event.preventDefault();window.open(whatsappUrl(),'_blank','noopener,noreferrer')});

function selectionListHTML(rows){return rows.length?`<div class="selection-table"><div class="selection-table-head"><span>Producto</span><span>Cantidad</span><span>Estado</span></div>${rows.map(({product,qty})=>`<article data-selection-item="${product.id}"><img src="${img(product)}" alt="${safe(product.name)}" loading="lazy" decoding="async"><div><h3>${safe(product.name)}</h3><p>${safe(product.brand)} · ${safe(product.line)}</p><button data-remove="${product.id}">Quitar</button></div><div class="qty-control"><button data-dec="${product.id}">−</button><span data-selection-qty="${product.id}">${qty}</span><button data-inc="${product.id}">+</button></div>${priceDisclosure(product)}</article>`).join('')}</div>`:`<div class="empty-selection page-empty"><h2>Tu selección está vacía</h2><p>Agrega productos desde el inicio o Ideas para regalar.</p><a class="btn btn-lilac" href="./index.html#beauty">Explorar productos</a></div>`}
function selectionSummaryHTML(rows){return `<h2>Resumen</h2><div><span>Referencias</span><strong data-summary-references>${rows.length}</strong></div><div><span>Total de unidades</span><strong data-summary-units>${totalUnits()}</strong></div><p>Los precios, variantes y disponibilidad se confirman por WhatsApp antes de cualquier pago.</p><button class="btn btn-lilac ${rows.length?'':'disabled'}" type="button" data-whatsapp-selection ${rows.length?'':'disabled'}>Enviar selección por WhatsApp</button><a class="btn btn-light" href="./index.html">Seguir explorando</a>`}
function updateSelectionUI(change={}){$$('[data-selection-count]').forEach(x=>x.textContent=`(${totalUnits()})`);renderSelectionPage(change);updateOpenDrawer(change)}
function renderSelectionPage(change={}){const list=$('[data-selection-page-list]'),summary=$('[data-selection-summary]');if(!list||!summary)return;const rows=selectionRows();if(!change.id||change.structural||!$(`[data-selection-item="${change.id}"]`,list)){list.innerHTML=selectionListHTML(rows);summary.innerHTML=selectionSummaryHTML(rows);return;}$$(`[data-selection-qty="${change.id}"]`,list).forEach(element=>element.textContent=selection[change.id]||0);const units=$('[data-summary-units]',summary);if(units)units.textContent=totalUnits();const references=$('[data-summary-references]',summary);if(references)references.textContent=rows.length}
function toast(text){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.append(t)}t.textContent=text;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200)}
updateSelectionUI();

// Aquí inicio el carrusel principal con una velocidad cómoda de lectura y ahorro de recursos.
(function initHeroCarousel(){
  const root=document.querySelector('[data-hero-carousel]');
  if(!root||root.dataset.autoplayReady==='true')return;
  root.dataset.autoplayReady='true';
  const slides=[...root.querySelectorAll('[data-hero-slide]')];
  const dots=root.querySelector('[data-hero-dots]');
  if(slides.length<2)return;
  let index=0,timer=null,touchStart=0;
  const renderDots=()=>{if(dots)dots.innerHTML=slides.map((_,i)=>`<button type="button" class="${i===index?'active':''}" data-hero-index="${i}" aria-label="Ver imagen ${i+1}" aria-current="${i===index?'true':'false'}"></button>`).join('')};
  const show=i=>{index=(i+slides.length)%slides.length;slides.forEach((slide,n)=>{slide.classList.toggle('is-active',n===index);slide.setAttribute('aria-hidden',n===index?'false':'true')});renderDots()};
  const clearTimer=()=>{if(timer!==null){window.clearTimeout(timer);timer=null}};
  const schedule=()=>{clearTimer();if(document.hidden)return;timer=window.setTimeout(()=>{show(index+1);schedule()},5000)};
  const move=i=>{show(i);schedule()};
  root.querySelector('[data-hero-next]')?.addEventListener('click',event=>{event.preventDefault();move(index+1)});
  root.querySelector('[data-hero-prev]')?.addEventListener('click',event=>{event.preventDefault();move(index-1)});
  dots?.addEventListener('click',event=>{const button=event.target.closest('[data-hero-index]');if(button){event.preventDefault();move(Number(button.dataset.heroIndex))}});
  root.addEventListener('touchstart',event=>{touchStart=event.touches[0].clientX;clearTimer()},{passive:true});
  root.addEventListener('touchend',event=>{const delta=event.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>45)show(index+(delta<0?1:-1));schedule()},{passive:true});
  document.addEventListener('visibilitychange',()=>document.hidden?clearTimer():schedule());
  show(0);
  schedule();
})();


// Navegación rápida flotante y títulos coherentes por sección.
(function initQuickNavigation(){
  const trigger=document.querySelector('[data-quick-nav-toggle]');
  const menu=document.querySelector('[data-quick-nav-menu]');
  if(!trigger||!menu)return;
  const close=()=>{menu.hidden=true;trigger.setAttribute('aria-expanded','false')};
  trigger.addEventListener('click',event=>{event.preventDefault();const open=menu.hidden;menu.hidden=!open;trigger.setAttribute('aria-expanded',String(open))});
  menu.addEventListener('click',()=>close());
  document.addEventListener('click',event=>{if(!event.target.closest('.quick-nav'))close()});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
})();
(function updatePageTitle(){
  const path=location.pathname.split('/').pop()||'index.html';
  const hash=location.hash;
  const staticTitles={'index.html':'Novedades','':'Novedades','buscar.html':'Buscar productos','ideas-para-regalar.html':'Ideas para regalar','nosotros.html':'Nosotros','terminos-y-condiciones.html':'Términos y condiciones','politica-de-privacidad.html':'Privacidad','cambios-y-devoluciones.html':'Cambios y devoluciones','politica-de-envios.html':'Envíos','pqrs.html':'PQRS'};
  const hashTitles={'#beauty':'Belleza','#style':'Moda','#accesorios':'De nuevo disponibles','#hogar':'Así se vive','#restock':'De nuevo disponibles','#novedades':'Novedades','#inicio':'Novedades'};
  const apply=()=>{const label=hashTitles[location.hash]||staticTitles[path]||'LIHEN.CO';document.title=`LIHEN.CO | ${label}`};
  apply();window.addEventListener('hashchange',apply);
})();
// ETAPA 27: pestaña promocional de bienvenida y formulario con autorización.
function mountWelcomePromo(){
  if(document.querySelector('[data-welcome-tab]'))return;
  const host=document.createElement('div');
  host.innerHTML=`<div class="welcome-tab-wrap"><button class="welcome-tab" type="button" data-welcome-tab aria-label="Abrir beneficio de bienvenida"><span>10%</span><small>BIENVENIDA</small></button><button class="welcome-tab-close" type="button" data-welcome-tab-hide aria-label="Ocultar beneficio">×</button></div><div class="welcome-modal-backdrop" data-welcome-modal hidden><section class="welcome-modal" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><button class="welcome-modal-close" type="button" data-welcome-close aria-label="Cerrar">×</button><div class="welcome-modal-copy"><p class="eyebrow">Beneficio LIHEN.CO</p><h2 id="welcome-title">Recibe un beneficio en tu primera compra.</h2><p>Déjanos tus datos para solicitar las condiciones vigentes de la campaña.</p><form data-welcome-form><label>Correo electrónico<input type="email" name="email" required placeholder="tu@correo.com"></label><fieldset><legend>Cumpleaños <small>(opcional)</small></legend><div class="birthday-fields"><input type="number" name="month" min="1" max="12" placeholder="MM" aria-label="Mes"><input type="number" name="day" min="1" max="31" placeholder="DD" aria-label="Día"><input type="number" name="year" min="1900" max="2026" placeholder="AAAA" aria-label="Año"></div></fieldset><label class="consent-check"><input type="checkbox" name="consent" required><span>Autorizo a LIHEN.CO a contactarme sobre este beneficio y acepto la <a href="./politica-de-privacidad.html">Política de privacidad</a>.</span></label><button class="btn btn-dark" type="submit">Solicitar beneficio</button><button class="welcome-no" type="button" data-welcome-close>Ahora no</button></form><small>El beneficio está sujeto a vigencia, productos participantes y demás condiciones informadas por LIHEN.CO.</small></div><div class="welcome-modal-art"><img src="./assets/banners/lihen_beneficio_bienvenida.webp" alt="Identidad visual de LIHEN.CO para el beneficio de bienvenida" loading="lazy" decoding="async"></div></section></div>`;
  document.body.append(...host.children);
  const modal=document.querySelector('[data-welcome-modal]');
  const open=()=>{modal.hidden=false;document.body.classList.add('no-scroll')};
  const close=()=>{modal.hidden=true;document.body.classList.remove('no-scroll')};
  document.querySelector('[data-welcome-tab]')?.addEventListener('click',open);
  document.querySelector('[data-welcome-tab-hide]')?.addEventListener('click',e=>{e.stopPropagation();document.querySelector('.welcome-tab-wrap')?.remove()});
  modal?.addEventListener('click',e=>{if(e.target===modal||e.target.closest('[data-welcome-close]'))close()});
  document.querySelector('[data-welcome-form]')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.currentTarget);const birth=[data.get('month'),data.get('day'),data.get('year')].filter(Boolean).join('/');const text=`Hola LIHEN.CO, deseo solicitar el beneficio de bienvenida. Correo: ${data.get('email')}.${birth?` Cumpleaños: ${birth}.`:''} Autorizo el contacto para conocer condiciones vigentes.`;copyWhatsAppMessage(text);window.open(OFFICIAL_WHATSAPP_URL,'_blank','noopener,noreferrer');close()});
}
mountWelcomePromo();
