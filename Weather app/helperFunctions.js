export const fetchURL = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const kelvinToCelsius = (arr) => {
  return Math.round(arr.main.temp - 273.15);
};

export const getHours = (arr) => {
  return new Date(arr.dt * 1000).getHours().toString().padStart(2, "0");
};

export const getMinutes = (arr) => {
  return new Date(arr.dt * 1000).getMinutes().toString().padStart(2, "0");
};

export const getDay = (data) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  if (new Date(data.dt * 1000).getDay() == new Date(Date.now()).getDay()) {
    return "Today";
  } else if (
    new Date(data.timestamp * 1000).getDay() ==
    new Date(Date.now()).getDay() + 1
  ) {
    return "Tomorrow";
  } else {
    return days[new Date(data.timestamp * 1000).getDay()];
  }
};

// I was more ddescriptive here, as changes to Open weather map API made some things complicated
export const calculateAndRenderFiveDaysForecastData = (data) => {
  /* As I will need to calulate averages to show the most reliable single point weather detail per each day (I want to show singular data for each day), 
      I created object that will keep the calcualted data and will be used to render template*/
  const fiveDaysForecastData = [
    {
      timestamp: 0,
      icon: "",
      wind_speed: 0,
      wind_deg: 0,
      temp_max: 0,
      temp_min: 0,
      description: "",
    },
    {
      timestamp: 0,
      icon: "",
      wind_speed: 0,
      wind_deg: 0,
      temp_max: 0,
      temp_min: 0,
      description: "",
    },
    {
      timestamp: 0,
      icon: "",
      wind_speed: 0,
      wind_deg: 0,
      temp_max: 0,
      temp_min: 0,
      description: "",
    },
    {
      timestamp: 0,
      icon: "",
      wind_speed: 0,
      wind_deg: 0,
      temp_max: 0,
      temp_min: 0,
      description: "",
    },
    {
      timestamp: 0,
      icon: "",
      wind_speed: 0,
      wind_deg: 0,
      temp_max: 0,
      temp_min: 0,
      description: "",
    },
  ];
  //After changes to endpoint, I had to work with 5 days 3 hours forecast, meaning I had to split days and calculate average values for each day.
  const days = {};
  //Iterate over API data
  data.list.map((_, i) => {
    // Get number of day from each iteration using date from the API data
    const date = new Date(data.list[i].dt_txt);
    const day = date.getDay();

    // Get number of today's day
    const now = new Date();
    const today = now.getDay();

    // Check if day is not today
    if (day != today) {
      // Check if such keyname already exists to avoid duplication (as its 3 hours forecast, so 8 items in array for each day are coming from the API)
      if (!days[day]) {
        // If not, initialize an empty array for this day
        days[day] = [];
      }

      // Push all the 3 hours forecast items of each day into respective day of my days object
      days[day].push(data.list[i]);
    }
  });

  // Iterate over days object
  for (let i in days) {
    // Iterate over each array of each days object key and in each iteration I save calculated averages into the fiveDaysForecast object
    for (let j = 0; j < days[i].length; j++) {
      fiveDaysForecastData[i - 1].temp_max += Math.round(
        days[i][j].main.temp_max / days[i].length
      );

      fiveDaysForecastData[i - 1].temp_min += Math.round(
        days[i][j].main.temp_min / days[i].length
      );

      fiveDaysForecastData[i - 1].wind_speed +=
        days[i][j].wind.speed / days[i].length;

      fiveDaysForecastData[i - 1].wind_deg +=
        days[i][j].wind.deg / days[i].length;
    }

    /* Description and icon were more difficult, 
     I was thikning about creating a counter (most common occurences would be saved, maybe categorzied even by priority), 
     but decided to not complicate too much and went for middle of the day description and icon */
    fiveDaysForecastData[i - 1].description = days[i][0].weather[0].description;
    fiveDaysForecastData[i - 1].icon = days[i][0].weather[0].icon;
    //Save timestamp for getDay() helper function
    fiveDaysForecastData[i - 1].timestamp = days[i][0].dt;
  }
  return fiveDaysForecastData;
};
