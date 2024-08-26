import "./main";
import "./styles/stock.scss";
import dayjs from "dayjs";
import { StockService } from "./service/stock.service.ts"
import { getStockRequest, getStockResponse } from './@type/stock.type.ts';

// 날짜 받기

// 공휴일
const holidays = ['2024-01-01', '2024-08-15', '2024-09-16','2024-09-17','2024-09-18','2024-10-03','2024-10-09', '2024-12-25'];
let chartResizing:any = null;

// 오늘 날짜
const today = dayjs();
const yesterday = today.subtract(2, 'day');

// 주말과 공휴일을 제외하고 오늘부터 일주일 전까지의 날짜를 담을 배열
const dates: string[]=[];
let currentDay = yesterday;

while (dates.length < 28) {  // 28일치 영업일을 얻을 때까지 반복
  const dayOfWeek = currentDay.day();
  const isHoliday = holidays.includes(currentDay.format('YYYY-MM-DD'));

  // 주말도 아니고 공휴일도 아닌 경우에만 배열에 추가
  if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday) {
      dates.push(currentDay.format('YYYYMMDD'));
  }

  // 하루 전으로 이동
  currentDay = currentDay.subtract(1, 'day');
}

// 날짜 담는 변수는 이상 없음
// console.log(dates)


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// 입력값 가져오기

const stockInput = document.getElementById('stock_code') as HTMLInputElement;
const stockButton = document.getElementById('stock-button') as HTMLButtonElement;
let defaultStockCode = '005930';
let stock_info = document.getElementById('stock_info') as HTMLElement;
let stockData: any[] = [];

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

        // Input에 입력하는대로 반영됨
        // console.log(stockCode)

        await fetchStockData(defaultStockCode);
  }


})


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// 버튼 입력한 값 가져오기

const button_1 = document.getElementById('stock_1') as HTMLButtonElement;
button_1.addEventListener('click', async ()=>{
  defaultStockCode="005930"
  await fetchStockData(defaultStockCode); 
})

const button_2 = document.getElementById('stock_2') as HTMLButtonElement;
button_2.addEventListener('click', async ()=>{
  defaultStockCode="000660"
  await fetchStockData(defaultStockCode); 
})

const button_3 = document.getElementById('stock_3') as HTMLButtonElement;
button_3.addEventListener('click', async ()=>{
  defaultStockCode="051910"
  await fetchStockData(defaultStockCode); 
})

const button_4 = document.getElementById('stock_4') as HTMLButtonElement;
button_4.addEventListener('click', async ()=>{
  defaultStockCode="036570"
  await fetchStockData(defaultStockCode); 
})

const button_5 = document.getElementById('stock_5') as HTMLButtonElement;
button_5.addEventListener('click', async ()=>{
  defaultStockCode="225570"
  await fetchStockData(defaultStockCode); 
})

const button_6 = document.getElementById('stock_6') as HTMLButtonElement;
button_6.addEventListener('click', async ()=>{
  defaultStockCode="105560"
  await fetchStockData(defaultStockCode); 
})

const button_7 = document.getElementById('stock_7') as HTMLButtonElement;
button_7.addEventListener('click', async ()=>{
  defaultStockCode="005490"
  await fetchStockData(defaultStockCode); 
})

const button_8 = document.getElementById('stock_8') as HTMLButtonElement;
button_8.addEventListener('click', async ()=>{
  defaultStockCode="068270"
  await fetchStockData(defaultStockCode); 
})

const button_9 = document.getElementById('stock_9') as HTMLButtonElement;
button_9.addEventListener('click', async ()=>{
  defaultStockCode="000880"
  await fetchStockData(defaultStockCode); 
})

const button_10 = document.getElementById('stock_10') as HTMLButtonElement;
button_10.addEventListener('click', async ()=>{
  defaultStockCode="005380"
  await fetchStockData(defaultStockCode); 
})



// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// API fetch

let priceData: Promise<getStockResponse>[]= [];

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

  // 새로운 차트 부를 때마다 초기화
  priceData = [];
  closingPrices = [];
  stockName = "";


  for(let i=0; i<dates.length; i++)
  {
    const requestParams: getStockRequest = {
      params: {
        resultType: 'json',
        basDt: parseInt(dates[i]),
        likeSrtnCd: stockCode,
      },
    };    

    // 여기서 값을 넣어주지 못하고 있음
    // NORMAL SERVICE이지만 데이터가 비었음

      priceData.push(stockService.getStock(requestParams)); 

  }


  stockData = await Promise.all(priceData);

  // try { 
  //   stockData = await Promise.all(priceData);
  // } catch (error) {
  //   console.log(error)
  // }


  // priceData가 비어서 당연히 stockData도 비어있음
  // console.log(stockData)

  stockName = stockData[1].response.body.items?.item[0]?.itmsNm;

  closingPrices = stockData.map(data => {
    return data.response.body.items?.item[0]?.clpr;
  });

  stock_mrktCtg = stockData.map(data => {
    return data.response.body.items?.item[0]?.mrktCtg;
  });

  stock_vs = stockData.map(data => {
    return data.response.body.items?.item[0]?.vs;
  });

  stock_hipr = stockData.map(data => {
    return data.response.body.items?.item[0]?.hipr;
  });

  stock_lopr = stockData.map(data => {
    return data.response.body.items?.item[0]?.lopr;
  });

  stock_trqu = stockData.map(data => {
    return data.response.body.items?.item[0]?.trqu;
  });

  updateChart(dates, closingPrices, stockName);
  stock_info.textContent = `${stockName} (${defaultStockCode}) 종가`;
  
}


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


// 차트

function updateChart(dates: string[], closingPrices: number[], stockName: string) {
    
    const baseCtx = document.getElementById('base-chart');
    
    if (baseChart) {
        baseChart.destroy();
      }


    // 종가는 제대로 저장됨
    // console.log(closingPrices)

    // null 값 제외하고 Math 함수 사용하기
    closingPrices = closingPrices.filter(price => !isNaN(price));

    let min_value = Math.min(...closingPrices) * 0.8;
    let max_value = Math.max(...closingPrices) * 1.2;

    
    baseChart = new (window as any).Chart(baseCtx, {
        type: 'bar',
        data: {
            labels: [dates[27],dates[26],dates[25],dates[24], dates[23],dates[22],dates[21],dates[20],dates[19],dates[18],dates[17],dates[16],dates[15],dates[14],dates[13],dates[12],dates[11],dates[10],dates[9],dates[8],dates[7],dates[6],dates[5],dates[4],dates[3],dates[2],dates[1],dates[0]],
            datasets: [{
                label: stockName + '(' + defaultStockCode + ')' + ' 종가',
                data: [
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
                    },
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function (context: any) {
                            const index = context.dataIndex;
                            
                            let date = context.label;
                            let value = context.parsed.y !== null ? context.parsed.y : '';
                            let marketCategory = stock_mrktCtg[index];
                            
                            let change = stock_vs[index];

                            let changeIcon = null;

                            if(change>0) {changeIcon='↑'}
                            else{changeIcon='↓'
                              change*=-1
                            }

                            let highPrice = stock_hipr[index];
                            let lowPrice = stock_lopr[index];
                            let tradingVolume = stock_trqu[index];

                            return [
                                ``,
                                `종목명 : ${stockName}`,
                                `날짜 : ${date}`,
                                `종가 : ${value} 원`,
                                `시장구분 : ${marketCategory}`,
                                `등락률 : ${changeIcon} ${change}`,
                                `고가 : ${highPrice}`,
                                `저가 : ${lowPrice}`,
                                `거래량 : ${tradingVolume}`,
                            ];
                        },
                    },
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
    clearTimeout(chartResizing);
    chartResizing = setTimeout(() => {
      fetchStockData(defaultStockCode);
    },300); 
});