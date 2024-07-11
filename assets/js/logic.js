// const apiKey = 'af1a16eb878a4e1e1b04e04dee962c30';
const apiKey = '166a433c57516f51dfab1f7edaed8413';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const containerEl = document.getElementById('container');

function getData() {
  let city = searchInput.value.trim()
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
    
  })
  .then(function (data) {
    renderCurrentWeather(city, data);
    console.log(data);
    
  })
  .catch(function (error) {
    console.error(error);
  });

}

function renderCurrentWeather(city, weather) {
  // pull in our desired weather values from the api data
  const icon = weather.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
  const temp = weather.list[0].main.temp;
  const humid = weather.list[0].main.humidity;
  const wind = weather.list[0].wind.speed;

  // create elements to render values to
  const cityEl = document.createElement('h1')
  const tempEl = document.createElement('h1')
  const humidEl = document.createElement('h1')
  const windEl = document.createElement('h1')
  const iconEl = document.createElement('img')

  // insert values to elements
  cityEl.textContent = city;
  iconEl.setAttribute('src', iconUrl)
  tempEl.textContent = temp;
  humidEl.textContent = humid;
  windEl.textContent = wind;
  
  // append elements to the page
  containerEl.append(cityEl, iconEl, tempEl, humidEl, windEl);


}

searchBtn.addEventListener('click', getData)