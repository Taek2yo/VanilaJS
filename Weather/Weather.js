const today = new Date();
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const todayOfdays = daysOfWeek[today.getDay()];
const icons = {
  "01d": "wi-day-sunny",
  "02d": "wi-day-cloudy",
  "03d": "wi-cloud",
  "04d": "wi-cloudy",
  "09d": "wi-showers",
  "10d": "wi-rain",
  "11d": "wi-thunderstorm",
  "13d": "wi-snow",
  "50d": "wi-fog",
  "01n": "wi-night-clear",
  "02n": "wi-night-alt-cloudy",
  "03n": "wi-cloud",
  "04n": "wi-night-cloudy",
  "09n": "wi-night-showers",
  "10n": "wi-night-rain",
  "11n": "wi-night-thunderstorm",
  "13n": "wi-night-alt-snow",
  "50n": "wi-night-fog",
};

/* header */
function getToday() {
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  day = day < 10 ? "0" + day : day;
  month = month < 10 ? "0" + month : month;
  document.getElementById(
    "today"
  ).innerHTML = `${year}.${month}.${day} ${todayOfdays}`;
}
getToday();
/* forecast container */
function updateForecastElements(forecastData) {
  let forecastContainer = document.getElementById("forecastContainer");
  if (!forecastContainer) {
    forecastContainer = document.createElement("div");
    forecastContainer.id = "forecastContainer";
    document.body.appendChild(forecastContainer);
  }

  forecastContainer.innerHTML = "";

  forecastData.forEach((dayData) => {
    const day = getDayOfWeek(dayData.dt_txt);
    console.log(dayData);
    const forecastElement = createForecastElement(
      day,
      dayData.weather[0].icon,
      dayData.main.temp,
      dayData.weather[0].main
    );
    forecastContainer.appendChild(forecastElement);
  });
}

function createForecastElement(day, icon, temp, desc) {
  let fieldset = document.createElement("fieldset");
  fieldset.classList.add("forecast-fieldset");

  let legend = document.createElement("legend");
  legend.textContent = day;
  fieldset.appendChild(legend);

  let weatherIcon = document.createElement("div");
  weatherIcon.innerHTML = `<i class="wi ${icons[icon]} weather-icon"></i>`;
  fieldset.appendChild(weatherIcon);

  let tempSpan = document.createElement("span");
  tempSpan.textContent = Math.floor(temp) + "°C";
  fieldset.appendChild(tempSpan);

  let descSpan = document.createElement("span");
  descSpan.textContent = desc;
  fieldset.appendChild(descSpan);

  if (day === "Sun") {
    legend.classList.add("day-text", "sun");
  } else if (day === "Sat") {
    legend.classList.add("day-text", "sat");
  }

  return fieldset;
}

function getDayOfWeek(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  return daysOfWeek[date.getUTCDay()];
}
// get location
const API_KEY = "api_key";

const locationButton = document.getElementById("getLocation");
locationButton.addEventListener("click", getLocation);
const success = (position) => {
  const { latitude, longitude } = position.coords;
  getWeatherByCoordinates(latitude, longitude);
  getForecastByCoordinates(latitude, longitude);
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success);
  } else {
    alert("당신의 브라우저가 geolocate을 지원하지 않아요!");
  }
}

// weather, forecast
const cityEl = document.querySelector(".city");
const countryEl = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const iconEL = document.querySelector(".icon");
const descEl = document.querySelector(".desc");

function getCityWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      cityEl.innerText = data.name + ",";
      countryEl.innerText = data.sys.country;
      iconEL.innerHTML = `<i class="wi ${
        icons[data.weather[0].icon]
      } weather-icon"></i>`;
      temperature.innerText = Math.floor(data.main.temp) + "°C";
      descEl.innerText = `${data.weather[0].main}`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function getForecast(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecastData = data.list.filter((obj) =>
        obj.dt_txt.endsWith("06:00:00")
      );
      updateForecastElements(forecastData);
    });
}
// api call ( by coordinate, city )
function getWeatherByCoordinates(latitude, longitude) {
  getCityWeather(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
}
function getForecastByCoordinates(latitude, longitude) {
  getForecast(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
}

function getWeatherByCity(city) {
  getCityWeather(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
}
function getForecastByCity(city) {
  getForecast(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
}

// current time
const time = document.querySelector(".time");

function getCurrentTime() {
  let currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  
  if (time) {
    time.innerText = currentTime;
  }
  requestAnimationFrame(getCurrentTime);
}
getCurrentTime();
