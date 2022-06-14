import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import './css/style.css';

import ImagesApi from './js/api';

import { form, gallery, loadMoreBtn } from './js/refs';

import { renderMarkup } from './js/markup';

form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onMorePhotos);

var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtn.classList.add('is-hidden');

function onSubmit(e) {

e.preventDefault();

gallery.innerHTML = '';
  
ImagesApi.query = e.currentTarget.elements.searchQuery.value.trim();
    
  if (!ImagesApi.query) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning('Fill this input, please!');
    return;
  }
  ImagesApi.resetPage();
  getImg();
  form.reset();
  loadMoreBtn.classList.remove('is-hidden');
}

async function getImg() {
  const data = await ImagesApi.fetchPhotos();

  if (!data.hits.length) {
    loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  Notiflix.Notify.success('Hoorey! We found images');

  renderMarkup(data.hits);
  lightbox.refresh();
}

function onMorePhotos() {
  getImg();
}