import "./main";
import "./styles/weather.scss";

import { WeatherService } from "./service/weather.service";

const weatherService = new WeatherService();

/** 주요도시 위경도 */
const citiesCoordinates: Record<string,{ lat: number, lon: number, nameKo: string }> = {
  Seoul: { lat: 37.5665, lon: 126.9780, nameKo:"서울" },
  Incheon: { lat: 37.4563, lon: 126.7052, nameKo:"인천" },
  Daejeon: { lat: 36.3504, lon: 127.3845, nameKo:"대전" },
  Busan: { lat: 35.1796, lon: 129.0756, nameKo:"부산" },
  Daegu: { lat: 35.8722, lon: 128.6025, nameKo:"대구" },
  Ulsan: { lat: 35.5384, lon: 129.3114, nameKo:"울산" },
  // Gwangju: { lat: 35.126033, lon: 126.831302 }, 위경도가 맞지 않음
};

//기준 위경도 서울로 설정
const state = {
  lat: citiesCoordinates.Seoul.lat,
  lon: citiesCoordinates.Seoul.lon
};

/** 유저의 위치정보를 갱신해주는 함수 */
const updateLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      state.lat = position.coords.latitude;
      state.lon = position.coords.longitude;
      resolve(position.coords);
    },error => reject(error));
  });
};

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  maxTemp: number;
  minTemp: number;
  weatherDescription: string;
  iconUrl: string;
};


const updateWeatherUI = (weatherData: WeatherData): void => {
  const $cityTitle = document.querySelector('.city-title') as HTMLElement;
  const $weatherNum = document.querySelector('.weather-num') as HTMLElement;
  const $weatherDes = document.querySelector('.weather-des') as HTMLElement;
  const $weatherIcon = document.querySelector('.current-weather img') as HTMLImageElement;
  const $weatherList = document.querySelector('.current-weather-list') as HTMLElement;
  
  $cityTitle.textContent = weatherData.city;
  $weatherNum.innerHTML = `${Math.round(weatherData.temperature - 273.15)}&deg;`; // 섭씨로 변환
  $weatherDes.textContent = weatherData.weatherDescription;
  $weatherIcon.src = weatherData.iconUrl;
  $weatherIcon.style.filter = `invert(42%) sepia(100%) saturate(1000%) hue-rotate(180deg) brightness(100%) contrast(100%)`; //아이콘 색상변경


  $weatherList.innerHTML = `
      <li><i class="fa-solid fa-droplet"></i>${weatherData.humidity}&#37;</li>
      <li><i class="fa-solid fa-temperature-arrow-up"></i>${Math.round(weatherData.maxTemp - 273.15)}&deg;</li>
      <li><i class="fa-solid fa-temperature-arrow-down"></i>${Math.round(weatherData.minTemp - 273.15)}&deg;</li>
  `;
};

const updateRegionWeatherUI = (cityKey: string, regionWeatherData:WeatherData): void => {
  const $listElement = document.getElementById("region-weather-list") as HTMLUListElement;
  

  const cityInfo = citiesCoordinates[cityKey];

  const $listItem = document.createElement("li");
  $listItem.innerHTML = `
    <a>${cityInfo.nameKo}
      <span>${Math.round(regionWeatherData.temperature - 273.15)}&deg;
      <img src="${regionWeatherData.iconUrl}"/></span>
    </a>
  `;
  

  // 클릭 이벤트 리스너 추가
  $listItem.addEventListener('click', (event) => {
    event.preventDefault();

    // 지역 날씨 상세 정보를 표시하는 함수 호출
    showRegionWeatherDetails(cityKey, regionWeatherData);

    // 상세 정보가 표시된 후 페이지를 가장 아래로 스크롤
    const $detailsSection = document.querySelector('.region-weather-content') as HTMLElement;
    $detailsSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
  });

  $listElement.appendChild($listItem);
};

const showRegionWeatherDetails = (cityKey: string, regionWeatherData: WeatherData): void => {
  const $detailsTitle = document.querySelector('.region-title') as HTMLElement;
  const $detailsTemp = document.querySelector('.region-num') as HTMLElement;
  const $detailsHumidity = document.querySelector('.region-weather-list')!.querySelectorAll('li')[0] as HTMLElement;
  const $detailsMaxTemp = document.querySelector('.region-weather-list')!.querySelectorAll('li')[1] as HTMLElement;
  const $detailsMinTemp = document.querySelector('.region-weather-list')!.querySelectorAll('li')[2] as HTMLElement;
  const $detailsIcon = document.querySelector('.region-weather-content img') as HTMLImageElement;

  const cityInfo = citiesCoordinates[cityKey];

  $detailsTitle.textContent = cityInfo.nameKo;
  $detailsTemp.innerHTML = `${Math.round(regionWeatherData.temperature - 273.15)}&deg;`;
  $detailsHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i>${regionWeatherData.humidity}&#37;`;
  $detailsMaxTemp.innerHTML = `<i class="fa-solid fa-temperature-arrow-up"></i>${Math.round(regionWeatherData.maxTemp - 273.15)}&deg;`;
  $detailsMinTemp.innerHTML = `<i class="fa-solid fa-temperature-arrow-down"></i>${Math.round(regionWeatherData.minTemp - 273.15)}&deg;`;
  $detailsIcon.src = regionWeatherData.iconUrl;
};



const initWeather = async (): Promise<void> => {
  try { 
    try { 
      await updateLocation()
      } catch(error) {console.error("Failed to update location", error)};

    const currentWeatherData = await weatherService.getCurrentWeather({
      params: {
        lat: state.lat,
        lon: state.lon,
        lang: "kr",
      }
      });

    updateWeatherUI(currentWeatherData);
    
    for (const cityKey in citiesCoordinates) {
      const { lat, lon } = citiesCoordinates[cityKey];
      const regionWeatherData = await weatherService.getCurrentWeather({
        params: { lat, lon },
      });

      updateRegionWeatherUI(cityKey, regionWeatherData);
    }


  } catch (error) {
    console.error("Failed to fetch weather data or update location", error);
  }
};

document.addEventListener('DOMContentLoaded', initWeather);

