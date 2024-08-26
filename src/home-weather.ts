import { citiesCoordinates, WeatherData, state, weatherService, updateLocation } from "./weather";

export const homeWeatherUI = (homeWeatherData: WeatherData): void => {
    const $cityTitle = document.querySelector('.now-location') as HTMLElement;
    const $weatherNum = document.querySelector('.weather-num') as HTMLElement;
    const $weatherDes = document.querySelector('.weather-des') as HTMLElement;
    const $weatherIcon = document.querySelector('.home-weather-top img') as HTMLImageElement | null;
    const $weatherList = document.querySelector('.current-weather-list') as HTMLElement;

    if ($cityTitle && $weatherNum && $weatherDes && $weatherList) {
        $cityTitle.innerHTML = `
            <div>
            <i class="fa-solid fa-location-dot"></i>
            현재위치 ${homeWeatherData.city}
            </div>`;
        $weatherNum.innerHTML = `${Math.round(homeWeatherData.temperature - 273.15)}&deg;`; // 섭씨로 변환
        $weatherDes.textContent = homeWeatherData.weatherDescription;

        if ($weatherIcon) {
            $weatherIcon.src = homeWeatherData.iconUrl;
            $weatherIcon.style.filter = `invert(42%) sepia(100%) saturate(1000%) hue-rotate(180deg) brightness(100%) contrast(100%)`;
        } else {}

        $weatherList.innerHTML = `
            <li>습도 ${homeWeatherData.humidity}&#37;</li>
            <li>최고기온 ${Math.round(homeWeatherData.maxTemp - 273.15)}&deg;</li>
            <li>최저기온 ${Math.round(homeWeatherData.minTemp - 273.15)}&deg;</li>
        `;
    } else {}
};

export const homeRegionUI = (cityKey: string, homeRegionData: WeatherData): void => {
    const $listElement = document.querySelector(".home-weather-bottom") as HTMLUListElement | null;
    const cityInfo = citiesCoordinates[cityKey];

    if ($listElement) {
        const $listItem = document.createElement("li");
        $listItem.innerHTML = `
            ${cityInfo.nameKo}&nbsp;<b>${Math.round(homeRegionData.temperature - 273.15)}&deg;</b>
        `;
        $listElement.appendChild($listItem);
    } else {}
};

export const homeWeather = async (): Promise<void> => {
    try { 

        for (const cityKey in citiesCoordinates) {
            const { lat, lon } = citiesCoordinates[cityKey];
            const homeRegionData = await weatherService.getCurrentWeather({
                params: { lat, lon },
            });
            homeRegionUI(cityKey, homeRegionData);
        }
        
        try {
            await updateLocation()
        } catch(error) {};

        const currentWeatherData = await weatherService.getCurrentWeather({
            params: {
                lat: state.lat,
                lon: state.lon,
                lang: "kr",
            }
        });

        homeWeatherUI(currentWeatherData);



    } catch (error) {}
};