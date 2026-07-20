document.querySelectorAll('.accordion>button').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.parentElement;const was=item.classList.contains('open');document.querySelectorAll('.accordion.open').forEach(x=>{x.classList.remove('open');x.querySelector('button').setAttribute('aria-expanded','false')});if(!was){item.classList.add('open');btn.setAttribute('aria-expanded','true')}}));
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');const f=btn.dataset.filter;document.querySelectorAll('.accordion').forEach(a=>a.classList.toggle('hidden',f!=='all'&&!a.dataset.group.split(' ').includes(f)))}));

// Aquí escucho el botón de impresión para abrir el diálogo del navegador sin usar código JavaScript dentro del HTML.
document.querySelector('[data-print-terms]')?.addEventListener('click', () => {
  window.print();
});
