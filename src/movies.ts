import "./main";
import "./styles/movie.scss";
import { MovieListService, IMG_URL } from './service/movies.service'
import $ from './moviesElements'



const movieListService = new MovieListService();



(async () => {

    // 8/22 - 실시간 영화순위  //
  const voteCountData = await movieListService.getVoteCountMovies({
    params: {
      include_adult: false,
      include_video: true,
      language: 'ko-KR',
      page: 1,
      sort_by: 'vote_count.desc',
    },
  });
  console.log('voteCountData', voteCountData);
  

  
  // 8/22 - 실시간 영화순위 영화포스터 가져오기 //  
  if (!$.movieContainer) return;

  $.movieContainer.innerHTML = '';
  const maxImages = 6;


  voteCountData.results.slice(0, maxImages).forEach(movie => {
   
    const $movieLi = document.createElement('li');
    // $movieLi.classList.add('title');

    const $img = document.createElement('img');

    $img.src = `${IMG_URL}` + movie.poster_path;
    $img.alt = movie.title;
    $img.dataset.id = movie.id.toString();

    $movieLi.appendChild($img);
    $.movieContainer?.appendChild($movieLi);
  });





   // 8/22 - 현재 상영작  //
    const nowPlayingData = await movieListService.getNowPlayingMovies({
    params: {
      include_adult: false,
      include_video: false,
      language: 'ko-KR',
      page: 1,
    },
  });
  console.log('nowplayingdata', nowPlayingData);



    // 8/22 - 현재 상영작 포스터 가져오기 //
    if (!$.movieContainer2) return;
    $.movieContainer2.innerHTML = '';
    // const totalImages = nowPlayingData.results.length;
    // const maxImages = 6;
  
    nowPlayingData.results.slice(0, maxImages).forEach(movie => {

        const $movieLi = document.createElement('li');
        // $movieLi.classList.add('title');
    
        const $img = document.createElement('img');
        $img.src = `${IMG_URL}` + movie.poster_path;
        
  
        $img.alt = movie.title;
        $img.dataset.id = movie.id.toString();
    
        const $box = document.createElement("ul");
        $box.className = "box";
        const $title = document.createElement("li");
        $title.className = "title";
        $title.textContent = '제목';
        const $details = document.createElement("li");
        const $detailButton = document.createElement("button");
        $detailButton.type = "button";
        $detailButton.textContent = "자세히 보기";
        $details.append($detailButton);
        $box.append($title, $details);

        $movieLi.append($img, $box);
        $.movieContainer2?.appendChild($movieLi);

    });



  //-------------------------------------


  // 8/22 - 개봉 예정작  //
  const upcomingData = await movieListService.getUpcomingMovies({
    params: {
      include_adult: false,
      include_video: false,
      language: 'ko-KR',
      page: 1,
      'release_date.gte': '2022-07-01',
      'release_date.lte': '2022-09-30',

    },
  });
  console.log('upcomingData', upcomingData);


  // 8/22 - 개봉 예정 영화 포스터 가져오기 //
    if (!$.movieContainer3) return;

    $.movieContainer3.innerHTML = '';
    // const totalImages = nowPlayingData.results.length;
    // const maxImages = 6;
  
    upcomingData.results.slice(0, maxImages).forEach(movie => {
     
      const $movieLi = document.createElement('li');
      // $movieLi.classList.add('title');
  
      const $img = document.createElement('img');
  
      $img.src = `${IMG_URL}` + movie.poster_path;
      $img.alt = movie.title;
      $img.dataset.id = movie.id.toString();
  
      $movieLi.appendChild($img);
      $.movieContainer3?.appendChild($movieLi);
    });





  // 영화 장르 조회
  const genreData = await movieListService.getMoviesGenre({
    params: {
      language: 'ko-KR',
    },
  });

  console.log('genreData', genreData);


  // 8/22 - API 장르에서 받아온 영화 장르로 nav에 카테고리 버튼 생성
  if (!$.navEl) return;
  $.navEl.innerHTML = '';

  genreData.genres.forEach(genre => {
   
    const $button = document.createElement('button');
    $button.textContent = genre.name;
    $button.dataset.genre = genre.id.toString();
    $button.setAttribute('type', 'button');
    $.navEl?.append($button);
  });


   // 8/22 - nav 버튼 active 붙이기
  $.navEl?.addEventListener("click", (e) => {
    const $target = e.target as HTMLElement;

    const button = $target.closest('button');

    if (button) {
      (e.currentTarget as HTMLElement)
        ?.querySelectorAll('button')
        ?.forEach((button) => {
          if (button.classList.contains('active')) {
            button?.classList?.remove('active');
          }
        });

      button?.classList.add('active');

    }
  
  });



})();
//끝



 









