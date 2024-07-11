// const apiKey = 'af1a16eb878a4e1e1b04e04dee962c30';
const apiKey = '166a433c57516f51dfab1f7edaed8413';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

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
  const date = null;
  const icon = weather.list[0].weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
  const temp = weather.list[0].main.temp;
  const humid = weather.list[0].main.humidity;
  const wind = weather.list[0].wind.speed;
  console.log(iconUrl);

}

searchBtn.addEventListener('click', getData)