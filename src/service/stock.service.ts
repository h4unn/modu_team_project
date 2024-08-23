import { getStockRequest, getStockResponse } from "../@type/stock.type";

const API_KEY = "3zfq3yDcxo4Aihc0rmj6Z/tGXcoPpZlZacVn0tFisfDouPFeLjUecsxIz/Ked9Zu5CknX3cBis3FeRtrA/V2AA==";

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
      url.searchParams.append(key, value.toString());
    });
    const res = await fetch(url);

    const data = (await res.json()) as getStockResponse;

    return data;
  }
}
