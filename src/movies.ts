import "./main";
import "./styles/movie.scss";
import { MovieListService } from './service/movies.service'




// const movieListService = new MovieListService();


// https://image.tmdb.org/t/p/w500 이미지 url 



// (async () => {

//   const nowPlayingData = await movieListService.getNowPlayingMovies({
//     params: {
//       include_adult: false,
//       include_video: false,
//       language: 'ko-KR',
//       page: 1,
//     },
//   });
//   console.log('nowplayingdata', nowPlayingData);


//   const upcomingData = await movieListService.getUpcomingMovies({
//     params: {
//       include_adult: false,
//       include_video: false,
//       language: 'ko-KR',
//       page: 1,
//     },
//   });
//   console.log('upcomingData', upcomingData);


// })();



//------------------------test 8/22 황다영 ----------------------//

// <nav class="category"></nav>
const navEl = document.querySelector('.category');

(navEl as HTMLElement).addEventListener('click', (e) => {
  // 2.
  const targetEl = e.target as HTMLElement;
  // const targetEl = e.target as EventTarget;
  // EventTarget이랑 HTMLElement 어떤차이..? 

   // 1. 실제 이벤트가 발생하는 button을 target 
  const button = targetEl.closest('button');

  if (button) {
    (e.currentTarget as HTMLElement)
    ?.querySelectorAll('button')
    ?.forEach((button) => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
      }
    });

    button.classList.add('active');
  }
});

