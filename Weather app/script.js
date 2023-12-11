class WeatherApp {
  html;
  hours;
  minutes;
  celsius;
  apiKey = "a1958dac69cfe18c41afc94f70eac9fe";
  constructor() {
    this.myLocation();
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

  fiveDaysForecast = async (lat, lon) => {
    // 5 day forecast
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${this.apiKey}`
    );
    const data = await res.json();
    console.log(data);
  };

  threeHourForecast = async (lat, lon) => {
    // 5 day 3 hour forecast
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );
    const data = await res.json();
    for (let i = 0; i < 6; i++) {
      const temperatureHtml = this.threeHoursTempMarkup(data.list[i]);
      document
        .querySelector(".hourly-forecast")
        .insertAdjacentHTML("beforeend", temperatureHtml);
    }
    console.log(data);
    console.log(
      `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`
    );
  };

  currentWeather = async (lat, lon) => {
    // Current weather
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );
    const data = await res.json();
    document.querySelector(".current-forecast__city").textContent = data.name;
    console.log(data.name);
  };

  threeHoursTempMarkup = (arr) => {
    return (
      (this.celsius = Math.round(arr.main.temp - 273.15)),
      (this.hours = new Date(arr.dt * 1000)
        .getHours()
        .toString()
        .padStart(2, "0")),
      (this.minutes = new Date(arr.dt * 1000)
        .getMinutes()
        .toString()
        .padStart(2, "0")),
      `<div class="hourly-forecast__time">
      <p>${this.hours}:${this.minutes}</p>
      <img src="https://openweathermap.org/img/wn/${
        arr.weather[0].icon
      }.png" alt="" />
      <p class="hourly-forecast__temp">${Math.round(
        arr.main.temp - 273.15
      )}°C</p>
    </div>`
    );
  };
}

new WeatherApp();
