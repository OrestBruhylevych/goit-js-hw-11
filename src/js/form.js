import Notiflix from 'notiflix';
import cardTpl from '../../cards';
import GalleryServis from './gallary_servis'

const axios = require('axios');

const galleryServis = new GalleryServis();

let inputValue = ""; 

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};


refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onChangeInput);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn)

 async function onFormSubmit(e) {
     e.preventDefault();

     if (inputValue === '') {
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
     }
     
     galleryServis.query = e.currentTarget.elements.query.value;
     galleryServis.resetPage();
     
     
     const photoArray = await galleryServis.getPhotos();
     
     if (photoArray.length === 0) {
         return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
     };


    console.log(photoArray);
     
    renderClear(refs.gallery);
    cardRenderMurcup(photoArray);



}
    
async function onClickLoadMoreBtn() {

    const photoArray = await galleryServis.getPhotos();
    if (photoArray.length === 0) {
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    };

    cardRenderMurcup(photoArray);
}

function onChangeInput(e) {
    inputValue = e.currentTarget.value;
}

 function cardRenderMurcup(array) {
    const marcup = array.map(card => cardTpl(card)).join('');
     refs.gallery.insertAdjacentHTML('beforeend', marcup);
}

function renderClear(element) {
  const markup = ``;
  element.innerHTML = markup;
}


