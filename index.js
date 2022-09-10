function changeDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate},  ${currentYear} `;

  return formattedDate;
}
let displayDate = document.querySelector("p#date");
let currentDate = new Date();
displayDate.innerHTML = changeDate(currentDate);

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
let displayTime = document.querySelector("p#time");
let currentTime = new Date();
displayTime.innerHTML = formatTime(currentTime);

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#form-input");
  searchCity(cityInput.value);
  let title = document.querySelector("title");
  title.innerHTML = cityInput.value;
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "c3e45eacea733c0910bacd0ec5f8c375";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].main;
  let title = document.querySelector("title");
  title.innerHTML = `${response.data.name}`;
  document.querySelector("#condition").innerHTML = condition;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
  document.querySelector("#mainPicture").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 78.8;
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertFahrenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertCelsius);
function convertCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 26;
}

function showWeather(response) {
  let temp = document.querySelector("#temperature");
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  let title = document.querySelector("title");
  temp.innerHTML = `${temperature}`;
  h1.innerHTML = `${response.data.name}`;
  title.innerHTML = `${response.data.name}`;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let condition = response.data.weather[0].main;
  document.querySelector("#condition").innerHTML = condition;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#wind").innerHTML = wind;
}
function setLocation(position) {
  let apiKey = "c3e45eacea733c0910bacd0ec5f8c375";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(setLocation);
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", setLocation);
