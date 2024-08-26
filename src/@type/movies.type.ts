

/**  영화 요청 공통 파라미터 (현재상영작,개봉예정작 요청파라미터가 같아서 하나로 정의) */
export type MoviesRequestParams = {
  /** 성인 컨텐츠 포함 여부 */
  include_adult?: boolean;
  /** 비디오 포함 여부 */
  include_video?: boolean;
  /** 응답 받을 언어 */
  language?: string;
  /** 페이지 번호 */
  page?: number;
  /** 정렬 기준 */
  sort_by?: string;

};


/** 영화 리뷰 순위 조회 - getVoteCountRequestParams */
export type getVoteCountMoviesRequestParams = MoviesRequestParams;

/** 현재 상영작 조회 요청 - getNowPlayingMoviesRequestParams */
export type getNowPlayingMoviesRequestParams = MoviesRequestParams;

/** 개봉 예정작 조회 요청 - getUpcomingMoviesRequestParams */
export type getUpcomingMoviesRequestParams = MoviesRequestParams & {
  /** 개봉 예정일 필터 (YYYY-MM-DD 형식/ min_date) */
  'release_date.gte'?: string;
  /** 개봉 예정일 필터 (YYYY-MM-DD 형식/ max_date) */
  'release_date.lte'?: string;
};



/** 영화 장르 조회 요청 - getMoviesGenreRequestParams */
export type getMoviesGenreRequestParams = {
  /** 응답 받을 언어 */
  language?: string;
}





/** 영화 리뷰 순위 조회 path,body */
export type getVoteCountMoviesRequestPath = {};
export type getVoteCountMoviesRequestBody = {};

/** 현재 상영작 조회 요청 path,body */
export type getNowPlayingMoviesRequestPath = {};
export type getNowPlayingMoviesRequestBody = {};



/** 개봉 예정작 조회 요청 path,body */
export type getUpcomingMoviesRequestPath = {};
export type getUpcomingMoviesRequestBody = {};

/**  영화 장르 조회 요청 path,body */
export type getMoviesGenreRequestPath = {};
export type getMoviesGenreRequestBody = {};





// 영화 리뷰 순위 조회 //
export type getVoteCountMoviesRequest = {
  params: getVoteCountMoviesRequestParams;
  path?: getVoteCountMoviesRequestPath;
  body?: getVoteCountMoviesRequestBody;
};

// 현재 상영작 조회 요청 //
export type getNowPlayingMoviesRequest = {
  params: getNowPlayingMoviesRequestParams;
  path?: getNowPlayingMoviesRequestPath;
  body?: getNowPlayingMoviesRequestBody;
};


// 개봉 예정작 조회 요청 //
export type getUpcomingMoviesRequest = {
  params: getUpcomingMoviesRequestParams;
  path?: getUpcomingMoviesRequestPath;
  body?: getUpcomingMoviesRequestBody;
};


// 영화 장르 조회 요청 //
export type getMoviesGenreRequest = {
  params: getMoviesGenreRequestParams;
  path?: getMoviesGenreRequestPath;
  body?: getMoviesGenreRequestBody;
};


/**  영화 공통 응답 파라미터 (현재상영작,개봉예정작 응답파라미터가 같아서 하나로 정의) */
export type MoviesResponse = {
  /** 페이지 번호 */
  page: number;
  /** 현재 상영작 목록 */
  results: Array<{
     /** 성인 컨텐츠 포함 여부 */
      adult: false;
     /** 배경이미지 경로 */
      backdrop_path: string;
     /** 장르 ID 목록 */
      genre_ids: Array<number>;
     /** 영화 ID */
      id: number;
     /** 원작 언어 */  
      original_language: string;
     /** 원작 제목 */
      original_title: string;
     /** 줄거리 내용 */
      overview: string;
     /** 인기도 */
      popularity: number;
     /** 포스터 이미지 경로 */
      poster_path: string;
      /** 개봉일 */
      release_date: string;
      /** 제목 */
      title: string;
      /** 비디오 포함 여부 */
      video: boolean;
      /** 평점 */
      vote_average: number;
      /** 투표 수 */
      vote_count: number;
      /** 개봉 예정일 필터 (YYYY-MM-DD 형식/ min_date) */
      'release_date.gte': string;
      /** 개봉 예정일 필터 (YYYY-MM-DD 형식/ max_date) */
      'release_date.lte': string;
  }>;
  /** 총 페이지 수  */
  total_pages: number;
  /** 총 영화 수 */
  total_results: number;
};



/** 영화 리뷰 순위 조회 - getVoteCountRequestParams */
export type getVoteCountMoviesResponse = MoviesResponse;

/** 현재 상영작 조회 응답 - getNowPlayingMoviesResponse */
export type getNowPlayingMoviesResponse = MoviesResponse;

/** 개봉 예정작 조회 응답 - getUpcomingMoviesResponse */
export type getUpcomingMoviesResponse = MoviesResponse;


/** 영화 장르 조회 응답 - getUpcomingMoviesResponse */
export type getMoviesGenreResponse = {
  genres: Array<{
    id: number;
    name: string;
  }>;
};

export type getPopupData  = { 
  /** 성인 컨텐츠 포함 여부 */
  adult: false;
  /** 배경이미지 경로 */
   backdrop_path: string;
  /** 장르 ID 목록 */
   genre_ids: Array<number>;
  /** 영화 ID */
   id: number;
  /** 원작 언어 */  
   original_language: string;
  /** 원작 제목 */
   original_title: string;
  /** 줄거리 내용 */
   overview: string;
  /** 인기도 */
   popularity: number;
  /** 포스터 이미지 경로 */
   poster_path: string;
   /** 개봉일 */
   release_date: string;
   /** 제목 */
   title: string;
   /** 비디오 포함 여부 */
   video: boolean;
   /** 평점 */
   vote_average: number;
   /** 투표 수 */
   vote_count: number;
}