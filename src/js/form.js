import Notiflix from 'notiflix';
import cardTpl from '../../cards';
import GalleryServis from './gallary_servis';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";



const galleryServis = new GalleryServis();

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};


refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn)

 async function onFormSubmit(e) {
     e.preventDefault();

     let inputValue = e.currentTarget.elements.searchQuery.value;

     refs.loadMoreBtn.style.display = 'none';

     if (inputValue === '') {
         renderClear(refs.gallery);
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
     }
     
     galleryServis.query = inputValue;
     galleryServis.resetPage();
     
     
     const { photoArray, totalPhotos } = await galleryServis.getPhotos();
     
     if (photoArray.length === 0) {
        renderClear(refs.gallery);
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
     };
     
    renderClear(refs.gallery);
    cardRenderMurcup(photoArray);
     
     refs.loadMoreBtn.style.display = 'block';
     
     addSimpleLightbox();

}
    
async function onClickLoadMoreBtn() {

    const { photoArray, totalPhotos } = await galleryServis.getPhotos();

     if (refs.gallery.children.length === totalPhotos) {
        refs.loadMoreBtn.style.display = 'none';
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }

    cardRenderMurcup(photoArray);

    addSimpleLightbox();

    scroll();
}

 function cardRenderMurcup(array) {
    const marcup = array.map(card => cardTpl(card)).join('');
     refs.gallery.insertAdjacentHTML('beforeend', marcup);
}

function renderClear(element) {
  const markup = ``;
  element.innerHTML = markup;
}

function addPreventDefaultLink (link) {
    return link.addEventListener('click', (e) => {
        e.preventDefault()
    });
}

function addSimpleLightbox() {
    const linksEl = document.querySelectorAll('.photo');
     linksEl.forEach((link) => {
         addPreventDefaultLink(link);
     });
    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function scroll() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight ,
  behavior: "smooth",
});
}
