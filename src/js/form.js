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
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
};


refs.form.addEventListener('submit', onFormSubmit);
refs.input.addEventListener('input', onChangeInput);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn)

async function onFormSubmit(e) {
    e.preventDefault();

    const url = `${PIXABAY_URL}?key=${options.key}&q=${options.q}&per_page=5&image_type=photo&orientation=horizontal&safesearch=true`;
    
    const response = await getPhotos(url);
    const photoArray = response.data.hits;
    const transformArray = transformArrayRequired(photoArray);

    if (transformArray.length === 0) {
        return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    };


    console.log(photoArray);
    console.log(transformArray);

    cardRenderMurcup(transformArray);

}
    
function onClickLoadMoreBtn() {
    
}


function onChangeInput(e) {
    options.q = e.currentTarget.value; 
}

 function getPhotos (url) {
    try {
        const response =  axios.get(url);
        return response;
        
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


