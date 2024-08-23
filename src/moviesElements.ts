const $ = {
  navEl: document.querySelector('.category'),
  movieContainer: document.querySelector('.movie-container'),
  movieContainer2: document.querySelector('.movie-container-2'),
  movieContainer3: document.querySelector('.movie-container-3'),
  // dialog Ele
  movieDialog: document.querySelector('dialog'),
  movieTit : document.querySelector('.movie_tit h3'),
  movieOriginTit : document.querySelector('.origin_tit'),
  movieDesc : document.querySelector('.movie_desc'),
  movieLike : document.querySelector('.movie_like span'),
  movieAudience : document.querySelector('.audience span'),
  movieGrade : document.querySelector('.grade span'),
} as const;

export default $;