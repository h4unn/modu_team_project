import {
    getStockRequest,
    getStockResponse,
  } from "../@type/stock.type";

const API_KEY = "3zfq3yDcxo4Aihc0rmj6Z%2FtGXcoPpZlZacVn0tFisfDouPFeLjUecsxIz%2FKed9Zu5CknX3cBis3FeRtrA%2FV2AA%3D%3D";

export class StockService {
    
  /** 주식 조회 */
  async getStock(req: getStockRequest) {
    const { params } = req;
    const url = new URL(`https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo`);
  
    Object.entries({
      ...params,
      serviceKey: API_KEY,
    }).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
    const res = await fetch(url);
    const data = (await res.json()) as getStockResponse;

    return data;
  }
  
}