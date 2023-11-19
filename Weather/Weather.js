// 날짜 정보 설정
const today = new Date();
const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
const todayOfdays = daysOfWeek[today.getDay()];

// 아이콘 정보 설정
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

// HTML 엘리먼트 캐싱
const cityEl = document.querySelector(".city");
const countryEl = document.querySelector(".country");
const temperature = document.querySelector(".temperature");
const iconEL = document.querySelector(".icon");
const descEl = document.querySelector(".desc");
const guideEl = document.querySelector(".guide");
const forecastContainer = createForecastContainer();

// API Key 설정
const API_KEY = config.apikey;

// 이벤트 리스너 등록
const locationButton = document.getElementById("getLocation");
locationButton.addEventListener("click", getLocation);

const searchButton = document.querySelector(".search");
searchButton.addEventListener("click", clickSearchBtn);

// 초기 화면 설정
function initialize() {
  getToday();
  getCurrentTime();
}

// 오늘 날짜 설정
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

// 현재 시간 표시
function getCurrentTime() {
  const time = document.querySelector(".time");
  if (time) {
    updateTime();
    setInterval(updateTime, 1000);
  }
}

function updateTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;
  document.querySelector(".time").innerText = currentTime;
}

// 위치 정보 가져오기
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, handleLocationError);
  } else {
    alert("Your browser does not support geolocation!");
  }
}

function success(position) {
  const { latitude, longitude } = position.coords;
  getWeatherByCoordinates(latitude, longitude);
  getForecastByCoordinates(latitude, longitude);
}

function handleLocationError(error) {
  console.log(error.message);
  alert("검색 실패");
}

// 도시별 날씨 및 예보 가져오기
function getWeatherByCoordinates(latitude, longitude) {
  getCityWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
}

function getForecastByCoordinates(latitude, longitude) {
  getForecast(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
}

function getWeatherByCity(city) {
  getCityWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
}

function getForecastByCity(city) {
  getForecast(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
}

// 날씨 정보 가져오기
function getCityWeather(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      updateWeather(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 날씨 예보 정보 가져오기
function getForecast(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const forecastData = data.list.filter((obj) =>
        obj.dt_txt.endsWith("06:00:00")
      );
      updateForecastElements(forecastData);
    })
    .catch((error) => {
      console.log(error);
    });
}

// 날씨 정보 및 예보 업데이트
function updateWeather(data) {
  cityEl.innerText = data.name + ",";
  countryEl.innerText = data.sys.country;
  guideEl.innerText = "";
  iconEL.innerHTML = `<i class="wi ${
    icons[data.weather[0].icon]
  } weather-icon"></i>`;
  temperature.innerText = Math.floor(data.main.temp) + "°C";
  descEl.innerText = `${data.weather[0].main}`;
}

// 예보 컨테이너 생성
function createForecastContainer() {
  let forecastContainer = document.getElementById("forecastContainer");
  if (!forecastContainer) {
    forecastContainer = document.createElement("div");
    forecastContainer.id = "forecastContainer";
    document.body.appendChild(forecastContainer);
  }
  return forecastContainer;
}

// 예보 업데이트
function updateForecastElements(forecastData) {
  forecastContainer.innerHTML = "";

  forecastData.forEach((dayData) => {
    const day = getDayOfWeek(dayData.dt_txt);
    const forecastElement = createForecastElement(
      day,
      dayData.weather[0].icon,
      dayData.main.temp,
      dayData.weather[0].main
    );
    forecastContainer.appendChild(forecastElement);
  });
}

// 요일 가져오기
function getDayOfWeek(dateString) {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  return daysOfWeek[date.getUTCDay()];
}

// 예보 엘리먼트 생성
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

  if (day === "일") {
    legend.classList.add("day-text", "sun");
  } else if (day === "토") {
    legend.classList.add("day-text", "sat");
  }

  return fieldset;
}

// 검색 버튼 클릭 이벤트 핸들러
function clickSearchBtn() {
  const cityInput = document.getElementById("cityInput").value;
  if (cityInput.trim() !== "") {
    getWeatherByCity(cityInput);
    getForecastByCity(cityInput);
  } else {
    alert("빈 칸을 채워주세요!");
  }
}

// 초기화 함수 호출
initialize();
