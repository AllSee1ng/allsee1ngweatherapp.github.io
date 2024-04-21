'use strict';

const searchInput = document.getElementById('weatherApp_input');
const searchForm = document.getElementById('weatherApp_form');
const weatherBlock = document.querySelector('.weatherInfoWrapper');

const weatherIcons = {
  '01d': './icons/clear_sky.png',
  '02d': './icons/few_clouds.png',
  '03d': './icons/clouds.png',
  '04d': './icons/clouds.png',
  '09d': './icons/shower_rain.png',
  '10d': './icons/rain.png',
  '11d': './icons/thunderstorm.png',
  '13d': './icons/snow.png',
  '50d': './icons/mist.png',
};

async function getWeatherByCity(city) {
  const apiKey = 'd4f9a02d62453a433b85a21b71f1a93f';
  const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(apiCall);
  const weatherData = await res.json();
  console.log(weatherData);
  return weatherData;
}

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  weatherBlock.innerHTML = '';
  const city = searchInput.value;
  const weatherData = await getWeatherByCity(city);
  render(weatherData);
});

function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;
  return element;
}

function createIconElement(iconSrc) {
  const icon = document.createElement('img');
  icon.classList.add('weatherInfo_icon');
  icon.src = iconSrc;
  return icon;
}

function render(weatherData) {
  const cityName = createElement('h3', 'weatherInfo_city', weatherData.name);
  const icon = createIconElement(weatherIcons[weatherData.weather[0].icon]);
  const temp = createElement('p', 'weatherInfo_temp', `${weatherData.main.temp}°C`);
  const wind = createElement('p', 'weatherInfo_wind', `Ветер: ${weatherData.wind.speed} м/с`);
  const humidity = createElement('p', 'weatherInfo_humidity', `Влажность: ${weatherData.main.humidity}%`);
  const moreWeatherInfo = document.createElement('div');
  moreWeatherInfo.classList.add('moreWeatherInfo');

  weatherBlock.appendChild(cityName);
  weatherBlock.appendChild(icon);
  weatherBlock.appendChild(temp);
  weatherBlock.appendChild(moreWeatherInfo);
  moreWeatherInfo.appendChild(wind);
  moreWeatherInfo.appendChild(humidity);
}