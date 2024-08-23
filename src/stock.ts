import "./main";
import "./styles/stock.scss";
import dayjs from "dayjs";
import { StockService } from "./service/stock.service.ts"
import { getStockRequest } from './@type/stock.type.ts';


// 공휴일
const holidays = [
  "2024-01-01",
  "2024-08-15",
  "2024-09-16",
  "2024-09-17",
  "2024-09-18",
  "2024-10-03",
  "2024-10-09",
  "2024-12-25",
];

// 오늘 날짜
const today = dayjs();
const yesterday = today.subtract(2, 'day');

// 주말과 공휴일을 제외하고 오늘부터 일주일 전까지의 날짜를 담을 배열
const dates = [];
let currentDay = yesterday;

while (dates.length < 7) {  // 7일치 영업일을 얻을 때까지 반복
  const dayOfWeek = currentDay.day();
  const isHoliday = holidays.includes(currentDay.format("YYYY-MM-DD"));

  // 주말도 아니고 공휴일도 아닌 경우에만 배열에 추가
  if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday) {
      dates.push(currentDay.format('MM/DD'));
  }

  // 하루 전으로 이동
  currentDay = currentDay.subtract(1, "day");
}

// dates 배열 출력 (예시)
console.log(dates);






const stockService = new StockService();

const requestParams: getStockRequest = {
  params: {
    // serviceKey: '',
    numOfRows: 10,
    pageNo: 1,
    resultType: 'json',
    basDt: 20240821,
    likeIsinCd: '005960'
  },
  path: {},
  body: {}
};


async function fetchStockData() {
  try {
    const stockData = await stockService.getStock(requestParams);
    console.log(stockData);
  } catch (error) {
    console.error('Error fetching stock data:', error);
  }
}

fetchStockData();







/** 차트 */
const baseCtx = (
  document.getElementById("base-chart") as HTMLCanvasElement
)?.getContext("2d");
// const overlayCtx = document.getElementById('overlay-chart').getContext('2d');


// console.log(priceData[0])


// const min_value = 300000;

// for(let i=0; i<30;i++)
//     {
//         if(min_value > closingPrices[i]) {min_value == closingPrices[i]}        
//     }

// const max_value = 0;


// for(let i=0; i<30;i++)
//     {
//         if(max_value < closingPrices[i]) {max_value == closingPrices[i]}        
//     }

// console.log(min_value, max_value)


const baseChart = new (window as any).Chart(baseCtx, {
    type: 'line',
    data: {
        labels: [dates[0], dates[1], dates[2], dates[3], dates[4], dates[5], dates[6]],
        datasets: [{
            label: 'Stock',
            data: [60, 59, 80, 81, 56, 70, 50],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
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
