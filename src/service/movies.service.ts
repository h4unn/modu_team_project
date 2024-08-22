import { 
  getNowPlayingMoviesRequest,
  getNowPlayingMoviesResponse,
  getUpcomingMoviesRequest,
  getUpcomingMoviesResponse,
  } from "../@type/movies.type";


/** 기본 TMDB API URL */
const HOST_URL = 'https://api.themoviedb.org';
/** API KEY */
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2FiODczNDg0MGM3ZTg0YmRlZjg3ZThjY2EwYWNjYyIsIm5iZiI6MTcyMzUwNjM1MC41OTA3NjUsInN1YiI6IjY2MTBlMTMzYjA5YmRlMDE3ZWJjYmE3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.91Lkyh_Yp1fow-wBetsYkgGhp6Nvw5sm8GnutDrAAE0';
// /** 이미지 URL */
// 'https://image.tmdb.org/t/p/w500';



export class MovieListService {
  /** 현재 상영작 조회 */
  async getNowPlayingMovies(req: getNowPlayingMoviesRequest) {
    const url = new URL(`${HOST_URL}/3/discover/movie`);

    for (let [key, value] of Object.entries(req.params)) {
      url.searchParams.append(key, value.toString());
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await res.json() as getNowPlayingMoviesResponse;
    return data;
  }


  /** 개봉 예정작 조회 */
  async getUpcomingMovies(req: getUpcomingMoviesRequest) {
    const url = new URL(`${HOST_URL}/3/discover/movie`);

    for (let [key, value] of Object.entries(req.params)) {
      url.searchParams.append(key, value.toString());
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    const data = await res.json() as getUpcomingMoviesResponse;
    return data;

  }
}


