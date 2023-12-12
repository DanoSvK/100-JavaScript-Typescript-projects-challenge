import config from "./config.js";
import templateConfig from "./config.template.js";
import { fetchURL } from "./helperFunctions.js";
import { kelvinToCelsius } from "./helperFunctions.js";
import { getHours } from "./helperFunctions.js";
import { getMinutes } from "./helperFunctions.js";
import { getDay } from "./helperFunctions.js";

// Check if API key is provided. If not, error is displayed
let apiKey;
const isAPIKeyProvided = () => {
  if (config.apiKey != "MY_API_KEY_HERE") {
    apiKey = config.apiKey;
  } else if (templateConfig.apiKey != "YOUR_API_KEY_HERE") {
    apiKey = templateConfig.apiKey;
  } else {
    console.log("No API key provded");
  }
};
isAPIKeyProvided();

// Main app architecture
const hourlyForecast = document.querySelector(".hourly-forecast");
const dailyForecast = document.querySelector(".daily-forecast");

const currCityNameEl = document.querySelector(".current-forecast__city");
const currTempValueEl = document.querySelector(".current-forecast__temp");
const currWeatherTypeEL = document.querySelector(".current-forecast__weather");
const btn = document.querySelector("button");
let city = document.querySelector("input");
class WeatherApp {
  html;
  hours;
  minutes;
  celsius;
  day;
  lat;
  lon;
  // city = document.querySelector("input").value;
  constructor() {
    this.myLocation();
    btn.addEventListener("click", () => {
      this.searchCurrentWeather(city.value);
    });
    btn.addEventListener("click", () => {
      this.searchThreeHourForecast(city.value);
    });
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  myLocation = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    try {
      const pos = await this.getPosition(options);
      const { latitude: lat, longitude: lon } = pos.coords;

      this.fiveDaysForecast(lat, lon);
      this.threeHourForecast(lat, lon);
      this.currentWeather(lat, lon);
    } catch (error) {
      console.error("Error getting location:", error.message);
    }
  };

  currentWeather = async (lat, lon) => {
    // Current weather
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const data = await fetchURL(url);
    currCityNameEl.textContent = data.name;
    currTempValueEl.textContent = `${kelvinToCelsius(data)}°C`;
    currWeatherTypeEL.textContent = data.weather[0].main;
  };

  threeHourForecast = async (lat, lon) => {
    // 5 day 3 hour forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const data = await fetchURL(url);
    for (let i = 0; i < 6; i++) {
      const temperatureHtml = this.threeHoursTempMarkup(data.list[i]);
      hourlyForecast.insertAdjacentHTML("beforeend", temperatureHtml);
    }
  };

  fiveDaysForecast = async (lat, lon) => {
    // 5 day forecast
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;
    const data = await fetchURL(url);
    let html;
    data.daily.map((_, i) => {
      html = this.fiveDaysForecastMarkup(data.daily[i]);
      dailyForecast.insertAdjacentHTML("afterbegin", html);
    });
  };
  // https: //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  searchCurrentWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const data = await fetchURL(url);

    const { lat, lon } = data.coord;
    this.lat = lat;
    this.lon = lon;

    currCityNameEl.textContent = data.name;
    currTempValueEl.textContent = `${kelvinToCelsius(data)}°C`;
    currWeatherTypeEL.textContent = data.weather[0].main;

    this.searchFiveDaysForecast();
  };

  searchThreeHourForecast = async (city) => {
    // 5 day 3 hour forecast
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const data = await fetchURL(url);
    hourlyForecast.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const temperatureHtml = this.threeHoursTempMarkup(data.list[i]);
      hourlyForecast.insertAdjacentHTML("beforeend", temperatureHtml);
    }
  };

  searchFiveDaysForecast = async () => {
    // 5 day forecast

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;
    const data = await fetchURL(url);

    let html;
    dailyForecast.innerHTML = "";
    data.daily.map((_, i) => {
      html = this.fiveDaysForecastMarkup(data.daily[i]);
      dailyForecast.insertAdjacentHTML("afterbegin", html);
    });
  };

  threeHoursTempMarkup = (arr) => {
    return (
      (this.celsius = kelvinToCelsius(arr)),
      (this.hours = getHours(arr)),
      (this.minutes = getMinutes(arr)),
      `<div class="hourly-forecast__time">
      <p>${this.hours}:${this.minutes}</p>
      <img src="https://openweathermap.org/img/wn/${arr.weather[0].icon}.png" alt="weather type icon" />
      <p class="hourly-forecast__temp">${this.celsius}°C</p>
    </div>`
    );
  };

  // fiveDaysForecastMarkup = (arr) => {
  //   return (
  //     (this.day = getDay(arr)),
  //     `
  //   <div class="daily-forecast__item">
  //         <p>${this.day}</p>
  //         <img src="https://openweathermap.org/img/wn/${
  //           arr.weather[0].icon
  //         }.png" alt="weather type icon" alt="" />
  //         <div class="daily-forecast__wind">
  //         <p>${arr.wind_speed}m/s</p>
  //             <svg
  //               xmlns="http://www.w3.org/2000/svg"
  //               width="30"
  //               height="30"
  //               viewBox="0 96 960 960"
  //               style="transform: rotate(${
  //                 arr.wind_deg
  //               }deg); transform-origin: center"
  //             >
  //               <path
  //                 d="M450 724h60V542l74 74 42-42-146-146-146 146 42 42 74-74v182Zm30 252q-82 0-155-31t-127-86q-55-55-86-128T80 576q0-83 32-156t86-127q54-54 127-85t155-32q83 0 156 32t127 85q54 54 86 127t31 156q0 82-31 155t-86 128q-54 54-127 86t-156 31Zm0-60q142 0 241-99t99-241q0-142-99-241t-241-99q-141 0-240 99T140 576q0 141 100 241t240 99Zm0-340Z"
  //               />
  //             </svg>
  //           </div>
  //         <div class="daily-forecast__temps">
  //         <p class="temp-low">${Math.round(arr.temp.max)}°C</p>
  //         <p class="temp-high">${Math.round(arr.temp.min)}°C</p>
  //         </div>
  //       </div>`
  //   );
  // };
  fiveDaysForecastMarkup = (arr) => {
    return (
      (this.day = getDay(arr)),
      `
    <tr class="daily-forecast__item">
          <td><p>${this.day}</p></td>
          <td><img src="https://openweathermap.org/img/wn/${
            arr.weather[0].icon
          }.png" alt="weather type icon" alt="" /></td>
          <td><div class="daily-forecast__wind">
          <p>${arr.wind_speed}m/s</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 96 960 960"
                fill="#ffffff"
                style="transform: rotate(${
                  arr.wind_deg
                }deg); transform-origin: center"
              >
                <path
                  d="M450 724h60V542l74 74 42-42-146-146-146 146 42 42 74-74v182Zm30 252q-82 0-155-31t-127-86q-55-55-86-128T80 576q0-83 32-156t86-127q54-54 127-85t155-32q83 0 156 32t127 85q54 54 86 127t31 156q0 82-31 155t-86 128q-54 54-127 86t-156 31Zm0-60q142 0 241-99t99-241q0-142-99-241t-241-99q-141 0-240 99T140 576q0 141 100 241t240 99Zm0-340Z"
                />
              </svg>
            </div></td>
            <td><div class="daily-forecast__temps">
          <p class="temp-low">${Math.round(arr.temp.max)}°C</p>
          <p class="temp-high">${Math.round(arr.temp.min)}°C</p>
          </div> </td>
        </tr>`
    );
  };
}

new WeatherApp();
