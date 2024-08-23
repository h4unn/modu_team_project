import "./main";
import "./styles/stock.scss";
import dayjs from "dayjs";
import { StockService } from "./service/stock.service.ts"
import { getStockRequest, getStockResponse } from './@type/stock.type.ts';


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


const priceData: Promise<getStockResponse>[]= []
let closingPrices: number[] = [];


async function fetchStockData() {
  
  const stockService = new StockService();

  for(let i=0; i<dates.length; i++)
  {
    const requestParams: getStockRequest = {
      params: {
        // serviceKey: '',
        numOfRows: 10,
        pageNo: 1,
        resultType: 'json',
        basDt: dates[i],
        likeIsinCd: '005930',
      },
    };    

    priceData.push(stockService.getStock(requestParams));

  }

  const stockData = await Promise.all(priceData);

  closingPrices = stockData.map(data => {
    return parseInt(data.response.body.items?.item[0].clpr);
  });

  console.log(closingPrices);
  console.log(stockData);
  
}

await fetchStockData()


/** 차트 */
const baseCtx = document.getElementById('base-chart').getContext('2d');
// const overlayCtx = document.getElementById('overlay-chart').getContext('2d');


let min_value = 300000;

for(let i=0; i<30;i++)
    {
        if(min_value > closingPrices[i]) min_value = closingPrices[i];     
    }


let max_value = 0;

for(let i=0; i<30;i++)
    {
        if(max_value < closingPrices[i]) max_value = closingPrices[i];     
    }

console.log(min_value, max_value)


const baseChart = new (window as any).Chart(baseCtx, {
    type: 'bar',
    data: {
        labels: [dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6],dates[7],dates[8],dates[9],dates[10],dates[11],dates[12],dates[13],dates[14],dates[15],dates[16],dates[17],dates[18],dates[19],dates[20],dates[21],dates[22],dates[23],dates[24],dates[25],dates[26],dates[27],dates[28],dates[29]],
        datasets: [{
            label: '주식 종가',
            data: [closingPrices[0], 
            closingPrices[1], 
            closingPrices[2], 
            closingPrices[3], 
            closingPrices[4], 
            closingPrices[5], 
            closingPrices[6],
            closingPrices[7],
            closingPrices[8],
            closingPrices[9],
            closingPrices[10],
            closingPrices[11],
            closingPrices[12],
            closingPrices[13],
            closingPrices[14],
            closingPrices[15],
            closingPrices[16],
            closingPrices[17],
            closingPrices[18],
            closingPrices[19],
            closingPrices[20],
            closingPrices[21],
            closingPrices[22],
            closingPrices[23],
            closingPrices[24],
            closingPrices[25],
            closingPrices[26],
            closingPrices[27],
            closingPrices[28],
            closingPrices[29],
        ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                min: min_value*0.8,
                max: max_value*1.8
            }
        },        
    //     plugins:{
    //       legend: {
    //           display: false
    //       },
    //   }
    }
});

// // 오버레이 도넛 차트
// const overlayChart = new Chart(overlayCtx, {
//     type: 'line',
//     data: {
//         labels: ['', '', '','','','','','','','','','','','','','','','','','','','','','','','','','','',''],
//         datasets: [{
//             label: 'Population',
//             data: [100, 120, 150, 170, 180, 190, 200,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190],
//             borderColor: [
//                 'rgba(255, 0, 0, 1)',
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//           y: {
//               display: false,
//               beginAtZero: true
//           }
//         },
//         layout: {
//           padding: {
//               top: 0,
//               bottom: 200,
//               left: 0,
//               right: 0
//           }
//       },
//         plugins:{
//           legend: {
//               display: false
//           },
//       }
//     }
// });