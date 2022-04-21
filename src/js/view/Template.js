import { CAR_STATE } from '../constants/index.js';

const spinnerTemplate =
  '<div class="d-flex justify-center mt-3"><div class="relative spinner-container"><span class="material spinner"></span></div></div>';

const getCarBoardItemTemplate = (car) => {
  return `
    <div class="mr-2">
      <div class="car-player">${car.name}</div>
      ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.processCount)}
      ${car.status === CAR_STATE.PARK ? '' : spinnerTemplate}
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
