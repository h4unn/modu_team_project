import "./main";
import "./styles/weather.scss";

import { WeatherService } from "./service/weather.service";

const weatherService = new WeatherService();

const state = { lat: 0, lon: 0 };

/** 유저의 위치정보를 갱신해주는 함수 */
const updateLocation = () => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      state.lat = position.coords.latitude;
      state.lon = position.coords.longitude;
      resolve(position.coords);
    });
  });
};

(async () => {
  await updateLocation();

  const currentWeatherData = await weatherService.getCurrentWeather({
    params: {
      lat: state.lat,
      lon: state.lon,
    },
  });
//   console.log(currentWeatherData);
  const weatherForecastData = await weatherService.getWeatherForecast({
    params: {
      lat: state.lat,
      lon: state.lon,
    },
  });
//   console.log(weatherForecastData);
})();
