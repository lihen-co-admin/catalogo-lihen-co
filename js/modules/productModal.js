/*
  Inicio la vista previa de productos en un módulo independiente.
  Recibo las funciones necesarias para no duplicar datos del catálogo.
*/
export function initProductModal(options) {
  const getProduct = options.getProduct;
  const imageFor = options.imageFor;
  const safe = options.safe;
  const short = options.short;
  const priceDisclosure = options.priceDisclosure;
  const onAdd = options.onAdd;

  let modalIndex = 0;
  let modalProduct = null;

  function findOne(selector, container = document) {
    if (!container || typeof container.querySelector !== 'function') {
      return null;
    }

    return container.querySelector(selector);
  }

  function openModal(id) {
    modalProduct = getProduct(id);

    if (!modalProduct) {
      return;
    }

    modalIndex = 0;
    renderModal();
    document.body.classList.add('no-scroll');
  }

  function renderModal() {
    const host = findOne('[data-product-modal]');

    if (!host || !modalProduct) {
      return;
    }

    host.hidden = false;
    host.innerHTML = `<section class="product-modal" role="dialog" aria-modal="true" aria-label="Vista previa de ${safe(modalProduct.name)}"><button class="modal-close" type="button" data-modal-close aria-label="Cerrar">×</button><div class="modal-gallery"><div class="modal-image-wrap"><img data-modal-gallery-image src="${imageFor(modalProduct, modalIndex)}" alt="${safe(modalProduct.name)}" decoding="async"><button class="gallery-arrow left" type="button" data-gallery-prev aria-label="Imagen anterior">‹</button><button class="gallery-arrow right" type="button" data-gallery-next aria-label="Imagen siguiente">›</button></div><div class="gallery-dots" data-modal-gallery-dots>${modalProduct.images.map(function (_, imageIndex) { return `<button type="button" class="${imageIndex === modalIndex ? 'active' : ''}" data-gallery-index="${imageIndex}" aria-label="Imagen ${imageIndex + 1}"></button>`; }).join('')}</div></div><div class="modal-details"><p class="eyebrow">${safe(modalProduct.line)} · ${safe(modalProduct.brand)}</p><h2>${safe(modalProduct.name)}</h2>${priceDisclosure(modalProduct)}<p>${safe(short(modalProduct.desc, 310))}</p><dl><div><dt>Disponibilidad</dt><dd>${safe(modalProduct.availability)}</dd></div><div><dt>Variantes</dt><dd>${safe(modalProduct.color)}</dd></div></dl><div class="modal-add-row"><div class="qty-control"><button type="button" data-modal-minus>−</button><span data-modal-qty>1</span><button type="button" data-modal-plus>+</button></div><button class="btn btn-lilac" type="button" data-modal-add>Agregar a mi selección</button></div><a class="direct-wa" href="https://wa.me/message/2JDWBH57SQG4F1" target="_blank" rel="noopener noreferrer">Consultar directamente por WhatsApp</a></div></section>`;
  }

  function updateModalGallery() {
    const galleryImage = findOne('[data-modal-gallery-image]');

    if (!galleryImage || !modalProduct) {
      return;
    }

    galleryImage.classList.add('is-changing');

    window.setTimeout(function () {
      galleryImage.src = imageFor(modalProduct, modalIndex);
      galleryImage.alt = `${modalProduct.name}, imagen ${modalIndex + 1}`;
      galleryImage.classList.remove('is-changing');
    }, 120);

    document.querySelectorAll('[data-modal-gallery-dots] [data-gallery-index]').forEach(function (dot, dotIndex) {
      dot.classList.toggle('active', dotIndex === modalIndex);
    });
  }

  function closeModal() {
    const host = findOne('[data-product-modal]');

    if (host) {
      host.hidden = true;
      host.innerHTML = '';
    }

    document.body.classList.remove('no-scroll');
  }

  function handleClick(event) {
    const previewButton = event.target.closest('[data-preview]');

    if (previewButton) {
      openModal(previewButton.dataset.preview);
    }

    if (event.target.matches('[data-modal-close]') || event.target.matches('[data-product-modal]')) {
      closeModal();
    }

    if (!modalProduct) {
      return;
    }

    if (event.target.matches('[data-gallery-prev]')) {
      event.preventDefault();
      event.stopPropagation();
      modalIndex = (modalIndex - 1 + modalProduct.images.length) % modalProduct.images.length;
      updateModalGallery();
    }

    if (event.target.matches('[data-gallery-next]')) {
      event.preventDefault();
      event.stopPropagation();
      modalIndex = (modalIndex + 1) % modalProduct.images.length;
      updateModalGallery();
    }

    const galleryButton = event.target.closest('[data-gallery-index]');

    if (galleryButton) {
      event.preventDefault();
      event.stopPropagation();
      modalIndex = Number(galleryButton.dataset.galleryIndex);
      updateModalGallery();
    }

    if (event.target.matches('[data-modal-minus]')) {
      const quantity = findOne('[data-modal-qty]');

      if (quantity) {
        quantity.textContent = Math.max(1, Number(quantity.textContent) - 1);
      }
    }

    if (event.target.matches('[data-modal-plus]')) {
      const quantity = findOne('[data-modal-qty]');

      if (quantity) {
        quantity.textContent = Number(quantity.textContent) + 1;
      }
    }

    if (event.target.matches('[data-modal-add]')) {
      const quantity = findOne('[data-modal-qty]');
      onAdd(modalProduct.id, quantity ? Number(quantity.textContent) : 1);
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);

  return {
    open: openModal,
    close: closeModal
  };
}
