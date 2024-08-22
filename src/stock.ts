import "./main";
import "./styles/stock.scss";
import dayjs from "dayjs";
import { StockService } from "./service/stock.service.ts"
import { getStockRequest } from './@type/stock.type.ts';


// 공휴일
const holidays = ['2024-01-01', '2024-08-15', '2024-09-16','2024-09-17','2024-09-18','2024-10-03','2024-10-09', '2024-12-25'];

// 오늘 날짜
const today = dayjs();

// 주말과 공휴일을 제외하고 오늘부터 일주일 전까지의 날짜를 담을 배열
const dates = [];
let currentDay = today;

while (dates.length < 7) {  // 7일치 영업일을 얻을 때까지 반복
  const dayOfWeek = currentDay.day();
  const isHoliday = holidays.includes(currentDay.format('YYYY-MM-DD'));

  // 주말도 아니고 공휴일도 아닌 경우에만 배열에 추가
  if (dayOfWeek !== 0 && dayOfWeek !== 6 && !isHoliday) {
      dates.push(currentDay.format('MM/DD'));
  }

  // 하루 전으로 이동
  currentDay = currentDay.subtract(1, 'day');
}

// dates 배열 출력 (예시)
console.log(dates);






const stockService = new StockService();

const requestParams: getStockRequest = {
  params: {
    serviceKey: '',
    numOfRows: 10,
    pageNo: 1,
    resultType: 'json',
    basDt: 20240821,
    likeIsinCd: 005960
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
const baseCtx = document.getElementById('base-chart').getContext('2d');
// const overlayCtx = document.getElementById('overlay-chart').getContext('2d');


const baseChart = new Chart(baseCtx, {
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
//     type: 'doughnut',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow'],
//         datasets: [{
//             label: 'Population',
//             data: [300, 50, 100],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)'
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)'
//             ],
//             borderWidth: 1
//         }]
//     },
//     options: {
//         responsive: true,
//         maintainAspectRatio: false
//     }
// });