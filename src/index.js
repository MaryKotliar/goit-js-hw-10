import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 500;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY) );
function onInput(event) {
  clearMarkup();
  const getinfo = event.target.value.trim().toLowerCase();
  if(!getinfo) {
    
    return
  }
  
  fetchCountries(getinfo)
  .then((data) => {
    
  if(data.length >= 10) {
    Notify.info("Too many matches found. Please enter a more specific name.")
  }
  if(data.length >= 2 && data.length < 10) {
    
    const markupList = makeMarkupList(data);
    refs.countryList.innerHTML = markupList;
  }
  if(data.length === 1) {
    
    const markup = makeMarkup(data);
    refs.countryInfo.innerHTML = markup;
  }
  } )
  .catch((error) => Notify.failure("Oops, there is no country with that name"));
  
}


function makeMarkup(data) {
  return data.map(({name, flags, capital, population, languages}) => {
    return `<div class ="country-composition"><div class="thumb"><img src="${flags.svg}"  /></div>
    <h2 class="country-name">${name}</h2></div><p><span>Capital:</span> ${capital}</p><p><span>Population:</span> ${population}</p><p><span>Languages:</span> ${languages[0].name}</p>`
    }).join("");
    
} 
function makeMarkupList(data) {
  return data.map(({name, flags}) => {
  
    return `<li><div class="thumb-mini"><img src="${flags.svg}" alt="flag"/></div>
    <p class="country-name">${name}</p></li>
    `
    
  }).join("");
  
}
function clearMarkup(){
  refs.countryList.innerHTML="";
  refs.countryInfo.innerHTML="";
}