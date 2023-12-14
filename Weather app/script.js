import config from "./config.js";
import templateConfig from "./config.template.js";
// prettier-ignore
import { fetchURL, kelvinToCelsius, getHours, getMinutes, getDay } from "./helperFunctions.js";
// Check if API key is provided. If not, error is displayed
let apiKey;
const isAPIKeyProvided = () => {
  if (config.ApiKey != "MY_API_KEY_HERE") {
    apiKey = config.ApiKey;
  } else if (templateConfig.apiKey != "YOUR_API_KEY_HERE") {
    apiKey = templateConfig.apiKey;
  } else {
    console.log("No API key provded");
  }
};
isAPIKeyProvided();

// Main app architecture
const sixThreeHourForecasts = 6;
const hourlyForecast = document.querySelector(".hourly-forecast");
const dailyForecast = document.querySelector(".daily-forecast");

const currCityNameEl = document.querySelector(".current-forecast__city");
const currTempValueEl = document.querySelector(".current-forecast__temp");
const currWeatherTypeEL = document.querySelector(".current-forecast__weather");
const errorMsg = document.querySelector(".error-message");
const btn = document.querySelector("button");
const dailyForecastEl = document.querySelector("daily-forecast");

let city = document.querySelector("input");

class WeatherApp {
  lat;
  lon;

  constructor() {
    this.myLocation();
    btn.addEventListener("click", () => {
      this.searchCurrentWeather(city.value);
      this.searchThreeHourForecast(city.value);
    });
    dailyForecast.addEventListener("click", (e) => {
      this.testFn(e);
    });
  }

  testFn = (e) => {
    if (!e.target.closest(".daily-forecast__item")) return;

    let items = document.querySelectorAll(".last-item");

    items.forEach((item) => {
      item.style.height = "0";
    });
    e.target.closest(".daily-forecast__item").nextElementSibling.style.height =
      "100%";
  };

  // Geolocation API
  getPosition = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // Geolocation API options
  myLocation = async () => {
    // Getting coords from geolocation API data
    try {
      const pos = await this.getPosition();
      const { latitude: lat, longitude: lon } = pos.coords;

      this.loadFiveDaysForecast(lat, lon);
      this.loadThreeHourForecast(lat, lon);
      this.loadCurrentWeather(lat, lon);
    } catch (error) {
      console.error("Error getting location:", error.message);
    }
  };

  // Load data on page load functions
  loadCurrentWeather = async (lat, lon) => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const data = await fetchURL(url);
      // Render markup
      currCityNameEl.textContent = data.name;
      currTempValueEl.textContent = `${kelvinToCelsius(data)}°C`;
      currWeatherTypeEL.textContent = data.weather[0].main;
    } catch {
      console.error("Error loading current weather:", error.message);
    }
  };

  loadThreeHourForecast = async (lat, lon) => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
      const data = await fetchURL(url);
      // Render markup
      for (let i = 0; i < sixThreeHourForecasts; i++) {
        const temperatureHtml = this.threeHoursTempMarkup(data.list[i]);
        hourlyForecast.insertAdjacentHTML("beforeend", temperatureHtml);
      }
    } catch {
      console.error("Error loading current weather:", error.message);
    }
  };

  loadFiveDaysForecast = async (lat, lon) => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;
      const data = await fetchURL(url);
      console.log(data);
      // Render markup
      let html;
      data.daily.map((_, i) => {
        html = this.fiveDaysForecastMarkup(data.daily[i]);
        dailyForecast.insertAdjacentHTML("beforeend", html);
      });
    } catch {
      console.error("Error loading current weather:", error.message);
    }
  };

  // Load data on search functions
  searchCurrentWeather = async (city) => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      const data = await fetchURL(url);

      // Render error message
      if (data.cod != 200)
        // prettier-ignore
        throw new Error(`Code ${data.cod}. ${data.message[0].toUpperCase()}${data.message.slice(1)}.`);

      // Render markup
      currCityNameEl.textContent = data.name;
      currTempValueEl.textContent = `${kelvinToCelsius(data)}°C`;
      currWeatherTypeEL.textContent = data.weather[0].main;

      // Openweather API does not provied 7 days forecast API based on city search and I wanted to avoid using reverse geocoding API.
      // I decided to coords from current weather API and save globally inside the class.
      // To save the coords and use them in the function before the function is called, it was neccessary to call the function from inside this function.
      const { lat, lon } = data.coord;
      this.lat = lat;
      this.lon = lon;
      this.searchSevenDaysForecast();
    } catch (err) {
      console.error(err);
      errorMsg.classList.add("active");
      setTimeout(() => {
        errorMsg.classList.remove("active");
      }, 3000);
    }
  };

  searchThreeHourForecast = async (city) => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const data = await fetchURL(url);

      // Render error message
      if (data.cod != 200)
        // prettier-ignore
        throw new Error(`Code ${data.cod}. ${data.message[0].toUpperCase()}${data.message.slice(1)}.`);

      // Render markup
      hourlyForecast.innerHTML = "";
      for (let i = 0; i < sixThreeHourForecasts; i++) {
        const temperatureHtml = this.threeHoursTempMarkup(data.list[i]);
        hourlyForecast.insertAdjacentHTML("beforeend", temperatureHtml);
      }
    } catch (err) {
      console.error(err);
      errorMsg.classList.add("active");
      setTimeout(() => {
        errorMsg.classList.remove("active");
      }, 3000);
    }
  };

  searchSevenDaysForecast = async () => {
    try {
      // Get data
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${apiKey}`;
      const data = await fetchURL(url);
      console.log(data);
      // Render error message
      if (!data)
        // prettier-ignore
        throw new Error(`Could not retrieve any data. Please, enter a correct city name!`);

      // Render markup
      let html;
      dailyForecast.innerHTML = "";
      data.daily.map((_, i) => {
        html = this.fiveDaysForecastMarkup(data.daily[i]);
        dailyForecast.insertAdjacentHTML("beforeend", html);
      });
    } catch (err) {
      console.error(err);
      errorMsg.classList.add("active");
      setTimeout(() => {
        errorMsg.classList.remove("active");
      }, 3000);
    }
  };

  // Markup
  threeHoursTempMarkup = (arr) => {
    const celsius = kelvinToCelsius(arr);
    const hours = getHours(arr);
    const minutes = getMinutes(arr);
    return `<div class="hourly-forecast__time">
      <p>${hours}:${minutes}</p>
      <img src="https://openweathermap.org/img/wn/${arr.weather[0].icon}.png" alt="weather type icon" />
      <p class="hourly-forecast__temp">${celsius}°C</p>
    </div>`;
  };

  fiveDaysForecastMarkup = (arr) => {
    const day = getDay(arr);
    return `
    <tr class="daily-forecast__item">
          <td><p>${day}</p></td>
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
          <p class="temp-high">${Math.round(arr.temp.max)}°C</p>
          <p class="temp-low">${Math.round(arr.temp.min)}°C</p>
          </div></td>
          <div class="last-item"><p>The weather today is mainly ${
            arr.weather[0].description
          } with max temperature of ${Math.round(
      arr.temp.max
    )}°C and lowest temperature of ${Math.round(
      arr.temp.min
    )}°C. You can expect wind speed of ${arr.wind_speed} m/s.</p></div>
        </tr>`;
  };
}

new WeatherApp();
