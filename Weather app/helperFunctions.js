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
    new Date(data.dt * 1000).getDay() ==
    new Date(Date.now()).getDay() + 1
  ) {
    return "Tomorrow";
  } else {
    return days[new Date(data.dt * 1000).getDay()];
  }
};
