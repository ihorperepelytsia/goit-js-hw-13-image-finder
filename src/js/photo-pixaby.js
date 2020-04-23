import { error } from '@pnotify/core';
import '@pnotify/core/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import photoService from './apiService';
import photoCardTemplate from '../templates/photo-card.hbs';
import spinner from './spinner';
import { showModal, closeModal } from './lightBox';

var debounce = require('lodash.debounce');

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.box-load-more'),
};

refs.searchForm.addEventListener('input', debounce(searchFormSubmitHendler, 750));
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', showModal);
document.addEventListener('keydown', closeModal);
document.addEventListener('mouseup', closeModal);

function searchFormSubmitHendler(e) {
  e.preventDefault();

  const inputValue = e.target.value;

  if (inputValue.length <= 1) {
    error({
      text: 'Введите больше символов',
    });
    return;
  }
  clearListItems();
  photoService.resetPage();
  photoService.searchQuery = inputValue;

  catchShow();
  refs.loadMoreBtn.classList.remove('is-hidden')
}

function loadMoreBtnHandler() {
  setTimeout(() => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight,
      behavior: 'smooth',
    });
  }, 1500);
  catchShow();
}

function catchShow() {
  spinner.show();
  photoService
    .fetchPhoto()
    .then(hits => {
      spinner.hide();
      wrongInput(hits);
      isertListItems(hits);
    })
    .catch(error => console.warn(error));
}

function isertListItems(items) {
  const markup = photoCardTemplate(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function wrongInput(arr) {
  if (arr.length === 0) {
    error({
      text: 'Ваш запрос слишком не понятный',
    });
  }
}
