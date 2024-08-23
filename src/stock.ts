import "./main";
import "./styles/stock.scss";
import dayjs from "dayjs";
import { StockService } from "./service/stock.service.ts"
import { getStockRequest, getStockResponse } from './@type/stock.type.ts';


// 날짜 받기

// 공휴일
const holidays = ['2024-01-01', '2024-08-15', '2024-09-16','2024-09-17','2024-09-18','2024-10-03','2024-10-09', '2024-12-25'];

// 오늘 날짜
const today = dayjs();
const yesterday = today.subtract(2, 'day');

// 주말과 공휴일을 제외하고 오늘부터 일주일 전까지의 날짜를 담을 배열
const dates = [];
let currentDay = yesterday;

while (dates.length < 30) {  // 30일치 영업일을 얻을 때까지 반복
  const dayOfWeek = currentDay.day();
  const isHoliday = holidays.includes(currentDay.format('YYYY-MM-DD'));

  // 주말도 아니고 공휴일도 아닌 경우에만 배열에 추가
  if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday) {
      dates.push(currentDay.format('YYYYMMDD'));
  }

  // 하루 전으로 이동
  currentDay = currentDay.subtract(1, 'day');
}

// dates 배열 출력
console.log(dates);


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// 입력값 가져오기

const stockInput = document.getElementById('stock_code') as HTMLInputElement;
const stockButton = document.getElementById('stock-button') as HTMLButtonElement;
let defaultStockCode = '005930'

stockButton.addEventListener('click', async()=>{
  let stockCode = stockInput.value.trim();

  // 주식 코드가 숫자 6자리인지 검증
  const stockCodePattern = /^\d{6}$/; // 숫자 6자리 패턴 정규식

  if (!stockCode) {
      alert('종목코드를 입력하세요.');
      stockInput.value= ""
  } 
  else if (!stockCodePattern.test(stockCode)) {
      alert('종목코드는 숫자 6자리여야 합니다.');
      stockInput.value= ""
  } 
  else {
        defaultStockCode = stockCode;
        await fetchStockData(defaultStockCode);
  }

})


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// API fetch

let priceData: Promise<getStockResponse>[]= []

/** 종가 */
let closingPrices: number[] = []; 
/** 시장구분 */
let stock_mrktCtg: string[] = [];
/** 대비 */
let stock_vs: number[] = [];
/** 고가 */
let stock_hipr: number[] = [];
/** 저가 */
let stock_lopr: number[] = [];
/** 거래량 */
let stock_trqu: number[] = [];

let stockName = "";
let baseChart: any = null;

async function fetchStockData(stockCode: string) {
  
  const stockService = new StockService();

  priceData = [];
  closingPrices = [];
//   stock_mrktCtg = [];
//   stock_vs = [];
//   stock_hipr = [];
//   stock_lopr = [];
//   stock_trqu = [];
  stockName = "";


  for(let i=0; i<dates.length; i++)
  {
    const requestParams: getStockRequest = {
      params: {
        // serviceKey: '',
        numOfRows: 10,
        pageNo: 1,
        resultType: 'json',
        basDt: dates[i],
        // likeIsinCd: stockCode,
        likeIsinCd: stockCode,
      },
    };    

    priceData.push(stockService.getStock(requestParams));

  }

  const stockData = await Promise.all(priceData);

  stockName = stockData[0].response.body.items?.item[0].itmsNm;
  console.log(stockName)

  closingPrices = stockData.map(data => {
    return parseInt(data.response.body.items?.item[0].clpr);
  });

//   stock_mrktCtg = stockData.map(data => {
//     return data.response.body.items?.item[0].mrktCtg;
//   });

//   stock_vs = stockData.map(data => {
//     return parseInt(data.response.body.items?.item[0].vs);
//   });

//   stock_hipr = stockData.map(data => {
//     return parseInt(data.response.body.items?.item[0].hipr);
//   });

//   stock_lopr = stockData.map(data => {
//     return parseInt(data.response.body.items?.item[0].lopr);
//   });

//   stock_trqu = stockData.map(data => {
//     return parseInt(data.response.body.items?.item[0].trqu);
//   });

  console.log(closingPrices);
  console.log(stockData);

  updateChart(dates, closingPrices, stockName);
  
}


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// 차트

// let min_value = 1000000;

// for(let i=0; i<30;i++)
//     {
//         if(min_value > closingPrices[i]) min_value = closingPrices[i];     
//     }


// let max_value = 0;

// for(let i=0; i<30;i++)
//     {
//         if(max_value < closingPrices[i]) max_value = closingPrices[i];     
//     }

// console.log(min_value, max_value)


function updateChart(dates: string[], closingPrices: number[], stockName: string) {
    
    const baseCtx = document.getElementById('base-chart').getContext('2d');
    
    if (baseChart) {
        baseChart.destroy();
      }


    let min_value = Math.min(...closingPrices) * 0.8;
    let max_value = Math.max(...closingPrices) * 1.2;


    baseChart = new (window as any).Chart(baseCtx, {
        type: 'bar',
        data: {
            labels: [dates[29], dates[28], dates[27], dates[26], dates[25], dates[24], dates[23],dates[22],dates[21],dates[20],dates[19],dates[18],dates[17],dates[16],dates[15],dates[14],dates[13],dates[12],dates[11],dates[10],dates[9],dates[8],dates[7],dates[6],dates[5],dates[4],dates[3],dates[2],dates[1],dates[0]],
            datasets: [{
                label: stockName + '(' + defaultStockCode + ')' + ' 종가',
                data: [closingPrices[29], 
                closingPrices[28], 
                closingPrices[27], 
                closingPrices[26], 
                closingPrices[25], 
                closingPrices[24], 
                closingPrices[23],
                closingPrices[22],
                closingPrices[21],
                closingPrices[20],
                closingPrices[19],
                closingPrices[18],
                closingPrices[17],
                closingPrices[16],
                closingPrices[15],
                closingPrices[14],
                closingPrices[13],
                closingPrices[12],
                closingPrices[11],
                closingPrices[10],
                closingPrices[9],
                closingPrices[8],
                closingPrices[7],
                closingPrices[6],
                closingPrices[5],
                closingPrices[4],
                closingPrices[3],
                closingPrices[2],
                closingPrices[1],
                closingPrices[0],
            ],
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        // 사용자 정의 툴팁 텍스트
                        label: function (context) {
                            // let label = context.dataset.label || '';

                            let value = context.parsed.y !== null ? context.parsed.y : '';
                            return [
                                ``,
                                `종목명 : ${stockName}`,
                                `날짜 : ${context.label}`,
                                `종가 : ${value} 원`,
                                // `시장구분 : ${stock_mrktCtg}`,
                                // `등락률 : ${stock_vs}`,
                                // `고가 : ${stock_hipr}`,
                                // `저가 : ${stock_lopr}`,
                                // `거래량 : ${stock_trqu}`,
                            ];
                        },
                    }
                }
            },
            scales: {
                y: {
                    min: min_value,
                    max: max_value,
                }
            }
        }
    });
}


await fetchStockData(defaultStockCode);

window.addEventListener("resize",()=>{
    fetchStockData(defaultStockCode);
  });