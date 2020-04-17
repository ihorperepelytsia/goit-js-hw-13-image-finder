const basicLightbox = require('basiclightbox');

let modal;

function showModal(e) {
  if (e.target.tagName === 'IMG') {
    modal = basicLightbox.create(
      `<img src="${e.target.dataset.source}" alt="${e.target.alt}"/>`,
      {
        closable: false,
      },
    );
    modal.show();
  }
}

function closeModal() {
  if (modal) {
    modal.close();
  }
}

export { showModal, closeModal };
