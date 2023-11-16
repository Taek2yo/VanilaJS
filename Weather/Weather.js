let today = new Date();
let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let todayOfdays = daysOfWeek[today.getDay()];

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
/* forecast */
function createForecastElement(day) {
  let fieldset = document.createElement("fieldset");
  fieldset.classList.add("forecast-fieldset");

  let legend = document.createElement("legend");
  legend.textContent = day;
  fieldset.appendChild(legend);

  let weatherIcon = document.createElement("div");
  weatherIcon.textContent = "Weather ico";
  fieldset.appendChild(weatherIcon);

  let tempSpan = document.createElement("span");
  tempSpan.textContent = "temp";
  fieldset.appendChild(tempSpan);

  let descSpan = document.createElement("span");
  descSpan.textContent = "desc";
  fieldset.appendChild(descSpan);

  if (day === "Sun") {
    legend.classList.add("day-text", "sun");
  } else if (day === "Sat") {
    legend.classList.add("day-text", "sat");
  }

  return fieldset;
}

let forecastContainer = document.getElementById("forecastContainer");
daysOfWeek
  .filter((day) => day !== todayOfdays)
  .forEach(function (day) {
    let forecastElement = createForecastElement(day);
    forecastContainer.appendChild(forecastElement);
  });
