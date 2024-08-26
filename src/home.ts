import "./main";
import "./styles/home.scss";
import { homeWeather } from "./home-weather"; // home-weather.ts에서 homeWeather 가져오기

import {homeRenderInit} from './todo/todos';


// movies import
import {  SMALL_IMG, MovieListService } from "./service/movies.service";
// import {  MoviesResponse } from "./@type/movies.type";
import $ from "./moviesElements";



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
    // homeTodo.addEventListener('click', () => {
    //     window.location.href = '/pages/todo.html';
    // });
});

//-------------------------- Movies ----------------------------------------//

    const movieListService = new MovieListService();


    /** 홈에서 영화 리스트 보여주는 함수 */
    async function renderNowPlaying() {
        // 현재 상영중인 영화 포스터 가져오기 //
        if (!$.movieContainer2) return;
        $.movieContainer2.innerHTML = "";
        const maxImages = 5;
      

        const nowPlayingData = await movieListService.getNowPlayingMovies({
            params: {
                include_adult: false,
                include_video: false,
                language: "ko-KR",
                page: 1,
              },
        });
        
        // 포스터 이미지 영역
        nowPlayingData.results.slice(0, maxImages).forEach((movie) => {
          const $movieLi = document.createElement('li');
          const bgImg = `${SMALL_IMG}` + movie.poster_path;      
          const $div = document.createElement('div');
          $div.style.backgroundImage = `url(${bgImg})`;
          $div.style.backgroundSize = 'cover';
          $div.style.backgroundPosition = 'center';
          $div.style.backgroundRepeat = 'no-repeat';
          $div.classList.add('img-area');
      
          // 영화제목, 평점 영역 ul.box > li
          const $box = document.createElement("ul");
          $box.className = "box";
          const $title = document.createElement("li");
          $title.className = "title";
          $title.textContent = `${'🎬'}` + movie.title;
          const $details = document.createElement("li");
          const $detailButton = document.createElement("button");
          $detailButton.type = "button";
          const voteAverage = movie.vote_average.toFixed(1);
          $detailButton.textContent = `${'⭐' + voteAverage}`;
          $detailButton.style.cursor = 'pointer';
          $details.append($detailButton);
          $box.append($title, $details);

          // 줄거리
          const $overView = document.createElement("ul");
          $overView.className = "overview";
          const $viewTitle = document.createElement("li");
          $viewTitle.className = "view-title";
          $viewTitle.textContent = `${movie.title}`
          const $viewDescription = document.createElement("li");
          $viewDescription.className = "view-des";
          $viewDescription.innerHTML = `
            <p>
              ${movie.overview}  
            </p>
            <a class="movie-more">더 보기</a>
          `;

          $overView.append($viewTitle, $viewDescription);
      
          $movieLi.append($div, $box, $overView);
          $.movieContainer2?.appendChild($movieLi);

       

          //-----------------------------------------------------//


        });
      }
      homeRenderInit();
      renderNowPlaying();
// Weather

document.addEventListener('DOMContentLoaded', homeWeather);


// Stock