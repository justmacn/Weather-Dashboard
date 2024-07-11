const apiKey = 'af1a16eb878a4e1e1b04e04dee962c30';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const containerEl = document.getElementById('container');
const btnContainerEl = document.getElementById('btn-container');
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];

// main function to retrieve our data from the weather api, render data to page, and store in localStorage
function getData() {
  let city = searchInput.value.trim()
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
  .then(function (response) {
    return response.json();
    
  })
  .then(function (data) {
    console.log(data);
    renderCurrentWeather(city, data);
    storeSearchHistory(city);
    
    
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
  const date = dayjs().format('D/MM/YYYY')

  // create elements to render values to
  const cityEl = document.createElement('h2')
  const dateEl = document.createElement('h2')
  const tempEl = document.createElement('p')
  const humidEl = document.createElement('p')
  const windEl = document.createElement('p')
  const iconEl = document.createElement('img')

  // insert values to elements
  cityEl.textContent = city;
  dateEl.textContent = `(${date})`;
  iconEl.setAttribute('src', iconUrl)
  tempEl.textContent = temp;
  humidEl.textContent = humid;
  windEl.textContent = wind;
  
  // append elements to the page
  containerEl.append(cityEl, dateEl, iconEl, tempEl, humidEl, windEl);

}

// function to store the city search results to the array and then localStorage
function storeSearchHistory(city) {
  storedCities.push(city);
  localStorage.setItem('cities', JSON.stringify(storedCities));

}

function createHistoryBtn() {
  const thisCity = JSON.parse(localStorage.getItem('cities'))

  for (let i = 0; i < thisCity.length; i++) {

    const newBtn = document.createElement('button');
    newBtn.classList.add('history-btn');
    newBtn.textContent = thisCity[i];
    btnContainerEl.append(newBtn);
  }
    
}

function handleSearchHistory(event) {
  if (!event.target.matches('.history-btn')) {
    return;
  }
  
  city = event.target.textContent
  getData(city)

}

function createForecastCards() {

}

// functions and event listeners to initialize on page load
createHistoryBtn();
searchBtn.addEventListener('click', getData)
btnContainerEl.addEventListener('click', handleSearchHistory)