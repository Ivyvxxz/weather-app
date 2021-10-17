function formatDate(timestamp) {
  let now = new Date(timestamp);
  let currentHour = now.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = now.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];
  return `${currentDay}, ${currentHour}:${currentMinutes}`;
}

function showData(response) {
  celsiusTemperature = response.data.main.temp;
  let city = document.querySelector("#current-city");
  city.innerHTML = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperature);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = response.data.main.humidity;
  let currentWindspeed = document.querySelector("#current-windspeed");
  currentWindspeed.innerHTML = Math.round(response.data.wind.speed);
  let currentConditions = document.querySelector("#current-conditions");
  currentConditions.innerHTML = response.data.weather[0].description;
  let currentDAT = document.querySelector("#current-date-and-time");
  currentDAT.innerHTML = formatDate(response.data.dt * 1000);
  let conditionsImage = document.querySelector("#conditions-image");
  conditionsImage.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function placeholder(city) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function getResponse(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  placeholder(searchInput.value);
}

function fahrenheitConversion(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function celsiusConversion(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", getResponse);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConversion);

placeholder("Sydney");
