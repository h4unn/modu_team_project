import "./main";
import "./styles/home.scss";


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