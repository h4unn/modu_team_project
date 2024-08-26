export type getWeatherForecastRequestParams = {
    /** 위도 */
    lat: number;
    /** 경도 */
    lon: number;
};

    export type getWeatherForecastRequestPath = {};
    
    export type getWeatherForecastRequestBody = {};

  /** 일기 예보 조회 요청 */
    export type getWeatherForecastRequest = {
        params: getWeatherForecastRequestParams;
        path?: getWeatherForecastRequestPath;
        body?: getWeatherForecastRequestBody;
    };

    /** 일기 예보 조회 응답 */
    export type getWeatherForecastResponse = {
    /**  */
    cod: number;
    /** 메세지 */
    message: number;
    /** ?? */
    cnt: number;
    /** 리스트 */
    list: Array<{
        /** 시간 정보 */
        dt: number;
        /** 메인정보 */
        main: {
            /** 온도 */
            temp: number;
            /** 체감 온도 */
            feels_like: number;
            /** 최저 온도 */
            temp_min: number;
            /** 최고 온도 */
            temp_max: number;
            /** 기압 */
            pressure: number;
            /** 해수면 기압 */
            sea_level: number;
            /** 지면 기압 */
            grnd_level: number;
            /** 습도 */
            humidity: number;
            /** 온도 */
            temp_kf: number;
        };
        /** 날씨 정보 */
        weather: Array<{
            /** ID */
            id: number;
            /** 날씨 상태 */
            main: string;
            /** 날씨 상태 설명 */
            description: string;
            /** 아이콘 */
            icon: string;
        }>;
        /** 구름 정보 */
        clouds: {
            /** 구름 양 */
            all: number
        };
        /** 바람 정보 */
        wind: {
            /** 풍속 */
            speed: number;
            /** 풍향 */
            deg: number;
            /** 돌풍 */
            gust: number;
        };
        /** 가시성 */
        visibility: number;
        /** ?? */
        pop: number;
        /** 비 정보 */
        rain: {
            /** ?? */
            "3h": number;
        };
        /** 시스템 정보 */
        sys: {
            /** ?? */
            pod: string;
        };
        /** 시간정보(텍스트) */
        dt_txt: string;
    }>;
    /** 도시 */
    city: {
        /** 도시 ID */
        id: number;
        /** 도시명 */
        name: string;
        /** 좌표 */
        coord: {
            /** 위도 */
            lat: number;
            /** 경도 */
            lon: number;
        };
        /** 국가 */
        country: string;
        /** 인구 */
        population: number;
        /** 타임존 */
        timezone: number;
        /** 일출 시간 */
        sunrise: number;
        /** 일몰 시간 */
        sunset: number;
    };
};