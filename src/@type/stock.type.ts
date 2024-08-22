/**  요청 파라미터 */
export type getStockRequestParams = {
  /** API_KEY */
  // serviceKey: string;
  /** 한 페이지 결과 수 */
  numOfRows?: number;
  /** 페이지 번호 */
  pageNo?: number;
  /** 결과 형식 */
  resultType?: string;
  /** 기준 일자 */
  basDt?: string;
  /** ISIN코드가 검색값을 포함하는 데이터 검색 */
  likeIsinCd: string;
};

export type getStockRequestPath = {};
export type getStockRequestBody = {};

/** 요청 */
export type getStockRequest = {
  params: getStockRequestParams;
  path?: getStockRequestPath;
  body?: getStockRequestBody;
};

/** 응답 */
export type getStockResponse = {
  /** 한 페이지 결과 수 */
  numOfRows: number;
  /** 페이지 번호 */
  pageNo: number;
  /** 전체 결과 수 */
  totalCount: number;

  items: {
    item: [
      {
        /** 기준일자 */
        basDt: number;
        /** 단축코드 */
        srtnCd: number;
        /** ISIN 코드 */
        isinCd: string;
        /** 종목명 */
        itmsNm: string;
        /** 시장구분 */
        mrktCtg: string;
        /** 종가 */
        clpr: number;
        /** 대비 */
        vs: number;
        /** 등락률 */
        fltRt: number;
        /** 시가 */
        mkp: number;
        /** 고가 */
        hipr: number;
        /** 저가 */
        lopr: number;
        /** 거래량 */
        trqu: number;
        /** 거래대금 */
        trPrc: number;
        /** 상장주식수 */
        lstgStCnt: number;
        /** 시가총액 */
        mrktTotAmt: number;
      }
    ];
  };
};
