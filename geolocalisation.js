"use strict";

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

/*const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  //countriesContainer.style.opacity=1;
};*/

const renderCountry = function (data) {
  const html = `
    <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
    </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
  countriesContainer.style.opacity = '1';
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity=1;
};
/*const whereAmI = function (latitude, longitude) {
  fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `problem with the geocoding API: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then((data) => {
      console.log(`You are in ${data.state}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`country not found (${response.status})`);
      }
      return response.json();
    })
    .then((data) => {
      renderCountry(data[0]);
    })
    .catch((err) => {
      console.log(`${err.message}`);
      renderError(`sommething went wrong ${err}. Try again`);
    });
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);*/


/*navigator.geolocation.getCurrentPosition(
  position=>console.log(position),
  err=> console.log(err)
);*/
console.log(`getting position`);

const getPosition = function(){
  return new Promise(function(resolve,reject){
    navigator.geolocation.getCurrentPosition(position=>resolve(position),err=> console.log(err));});
};
//getPosition().then(pos=>console.log(pos));




const whereAmI = function () {
  getPosition().then(pos=>{
    const {latitude:lat,longitude:long}=pos.coords;
    return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`);
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `problem with the geocoding API: ${response.statusText}`
        );
      }
      return response.json();
    })
    .then(data => {
      console.log(`You are in ${data.state}, ${data.country}`);
      return fetch(`https://restcountries.com/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`country not found (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => {
      console.log(`${err.message}`);
      renderError(`sommething went wrong ${err}. Try again`);
    });
};
whereAmI();