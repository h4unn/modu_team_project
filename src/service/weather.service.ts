// import {
//     getWeatherForecastRequest,
//     getWeatherForecastResponse,
//   } from "../@type/weathers/forecast.type";
  
import {
  getCurrentWeatherRequest,
  getCurrentWeatherResponse,
} from "../@type/weathers/current.type";

const weatherkey = "68651cebe0326dadf201e10763812be2";

export class WeatherService {
  /** 현재 날씨 조회 */
  async getCurrentWeather(req: getCurrentWeatherRequest) {
    const { params } = req;
    const url = new URL(`https://api.openweathermap.org/data/2.5/weather`);
  
    Object.entries({
      ...params,
      appid: weatherkey,
    }).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
    const res = await fetch(url);
    const data = (await res.json()) as getCurrentWeatherResponse;

    // console.log(data);
    return {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      maxTemp: data.main.temp_max,
      minTemp: data.main.temp_min,
      weatherDescription: data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  };
  }

   /** 일기 예보 조회 */
  // async getWeatherForecast(req: getWeatherForecastRequest){
  //   const { params } = req;
  //   const url=new URL(`https://api.openweathermap.org/data/2.5/forecast`);

  //   Object.entries({
  //     ...params,
  //     appid:weatherkey,
  //   }).forEach(([key,value])=>{
  //     url.searchParams.append(key,value.toString());
  //   });
  //   const res=await fetch(url);
  //   const data= (await res.json()) as getWeatherForecastResponse;

  //   // return data;
  //   return {
  //     city: data.city.coord,
  //     temperature: data.list[1].main.temp,
  //     humidity: data.list[1].main.humidity,
  //     maxTemp: data.list[1].main.temp_max,
  //     minTemp: data.list[1].main.temp_min,
  //     weatherDescription: data.list[2].weather[0].description,
  //     iconUrl: `https://api.weather.com/icons/${data.list[2].weather[0].icon}.png`,
  // };
  // }
}
