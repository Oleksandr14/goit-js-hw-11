import { gallery } from './refs';

export const renderMarkup = images => {
  const markup = images
    .map(image => {
      const { id, webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
      return `
          <a class="link" href="${largeImageURL}">
          <div id="${id}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" class="img-item"/>
            <div class="container">
              <p class="container__item"><b>Likes</b>${likes}</p>
              <p class="container__item"><b>Views</b>${views}</p>
              <p class="container__item"><b>Comments</b>${comments}</p>
              <p class="container__item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
          </a>
      `;
    })
    .join('');
  updateMarkup(markup);
}

function updateMarkup(markup = '') {
  gallery.insertAdjacentHTML('beforeend', markup);
}
