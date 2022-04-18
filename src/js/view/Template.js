import { CAR_STATE } from '../constants/index.js';

const getCarBoardItemTemplate = (car) => {
  return `
    <div class="mr-2">
      <div class="car-player">${car.name}</div>
      ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.processCount)}
    </div>
  `;
};

export const getCardBoardTemplate = (cars) => {
  return `
    <div class="mt-4 d-flex">
      ${cars.map((car) => getCarBoardItemTemplate(car)).join('')}
    </div>
  `;
};

export const getWinnerNamesTemplate = (winnerList) => {
  return `🏆 최종 우승자: ${winnerList.join(', ')} 🏆`;
};
