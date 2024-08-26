import { getStockRequest, getStockResponse } from "../@type/stock.type";

const API_KEY = "Aw/vVGACO2Mz39KjA9aMfOslnFkOJssnveVp0SkeK+Svru1wPZCiRMvNew9FjJkJ+rL7B2GOH6WxBCSkG7QWBQ==";
// const API_KEY = "mmgLc5RFMR2pSLYDzJG4hjwJ3YhhENLjNNLB8gydDWy7v8vWYsFV7STq42VHvIZWnbumP3L6Qrts6y/iG9p4zA==";

export class StockService {
  /** 주식 조회 */
  async getStock(req: getStockRequest) {
    const { params } = req;
    const url = new URL(
      `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`
    );


    Object.entries({
      ...params,
      serviceKey: decodeURIComponent(API_KEY),
    }).forEach(([key, value]) => {
      // value가 null 또는 undefined인 경우 빈 문자열로 처리
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value.toString());
      }
    });


    const res = await fetch(url);

    const data = (await res.json()) as getStockResponse;

    return data;
  }
}
