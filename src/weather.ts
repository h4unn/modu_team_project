import "./main";
import "./styles/weather.scss";

import { WeatherService } from "./service/weather.service";

const weatherService = new WeatherService;

const state = { lat: 0, lon: 0};

(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        state.lat = position.coords.latitude
  })
  })();

const currentLatitude = navigator.geolocation.getCurrentPosition((position) => {
    return(position.coords.latitude)
  });

const currentLongitude = navigator.geolocation.getCurrentPosition((position) => {
    return(position.coords.longitude);
  });

console.log(currentLatitude);

(async () => {
    
    const currentWeatherData = await weatherService.getCurrentWeather({
        params:{
            lat:currentLatitude,
            lon:currentLongitude,
        },
    });
    console.log(currentWeatherData)
    const weatherForecastData = await weatherService.getWeatherForecast({
        params:{
            lat:currentLatitude,
            lon:currentLongitude,
        },
    });
    console.log(weatherForecastData)
})();