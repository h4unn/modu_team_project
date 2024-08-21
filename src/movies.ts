import "./main";
import "./styles/movie.scss";
import { MovieListService } from './service/movies.service'


const movieListService = new MovieListService();


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


