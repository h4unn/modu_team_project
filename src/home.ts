import "./main";
import "./styles/home.scss";
import { homeWeather } from "./home-weather"; // home-weather.ts에서 homeWeather 가져오기


// 클릭시 tab이동
document.addEventListener('DOMContentLoaded', () => {
    const homeWeather = document.getElementById('home-weather') as HTMLElement;
    const homeStock = document.getElementById('home-stock') as HTMLElement;
    const homeMovies = document.getElementById('home-movie') as HTMLElement;
    const homeTodo = document.getElementById('home-todo') as HTMLElement;

    homeWeather.addEventListener('click', () => {
        window.location.href = '/pages/weather.html';
    });
    homeStock.addEventListener('click', () => {
        window.location.href = '/pages/stock.html';
    });
    homeMovies.addEventListener('click', () => {
        window.location.href = '/pages/movies.html';
    });
    homeTodo.addEventListener('click', () => {
        window.location.href = '/pages/todo.html';
    });
});

// Weather

document.addEventListener('DOMContentLoaded', homeWeather);


// Stock

// Movies