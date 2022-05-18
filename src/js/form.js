import Notiflix from 'notiflix';
import cardTpl from '../../cards';

const axios = require('axios');

const PIXABAY_URL = 'https://pixabay.com/api/';
const options = {
    key: '27489474-94b4f7a986300e41a9c081f6f',  
    q: ''
};

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    submitBtn: document.querySelector('[type="submit"]'),
    gallery: document.querySelector('.gallery')
};


refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onChangeInput);

function onFormSubmit(e) {
    e.preventDefault();

    const url = `${PIXABAY_URL}?key=${options.key}&q=${options.q}&image_type=photo&orientation=horizontal&safesearch=true`;

    getPhotos(url).then(r => {
        if (r.length === 0) {
            return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        }

        cardRenderMurcup(r);
    })


}
    


function onChangeInput(e) {
    options.q = e.currentTarget.value; 
}

async function getPhotos (url) {
    try {
        const response = await axios.get(url);
        const photoArray = await response.data.hits;
        const transformArray = await transformArrayRequired(photoArray);

        return transformArray;
    } catch (error) {
        console.error(error);
    }
}

function transformArrayRequired(array) {
   return array.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return {
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads
        }
    }
    )
}
 
 function cardRenderMurcup(array) {
    const marcup = array.map(card => cardTpl(card)).join('');
     refs.gallery.innerHTML = marcup;
}

function renderClear(element) {
  const markup = ``;
  element.innerHTML = markup;
}


