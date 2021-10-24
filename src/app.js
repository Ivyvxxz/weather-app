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
function formatForecastDay(timestamp) {
  let date = new Date(timestamp);
  let forecastDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[forecastDay];
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
  getForecastResponse(response.data.coord);
}

function showForecast(response) {
  let forecastCard = document.querySelector("#forecast-card");
  let dailyForecast = response.data.daily;
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class = "row">
      <div class="col-3 forecast-day">${formatForecastDay(
        forecastDay.dt * 1000
      )}</div>
      <div class="col-6 forecast-conditions">
      <img class = forecast-image src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" />
      ${forecastDay.weather[0].description}
      </div>
      <div class="col-3 forecast-temps">
      <span class="forecast-temp-max"> ${Math.round(
        forecastDay.temp.max
      )}</span>°
      <span class="forecast-temp-min">${Math.round(
        forecastDay.temp.min
      )}</span>°
      </div>
      </div>`;
    }
  });
  forecastCard.innerHTML = forecastHTML + `</div>`;
}

function getForecastResponse(coordinates) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function placeholder(city) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showData);
}

function changePlaceholderValue(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  placeholder(searchInput.value);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changePlaceholderValue);

placeholder("Sydney");
