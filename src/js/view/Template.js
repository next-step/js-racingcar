import { CAR_STATE } from '../constants/index.js';

const getCarBoardItemTemplate = ({ name, stateList }) => {
  return `
    <div class="mr-2">
      <div class="car-player">${name}</div>
      ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(stateList.filter((state) => state === CAR_STATE.GO).length)}
    </div>
  `;
};

export const getCardBoardTemplate = (carBoard) => {
  if (!carBoard || carBoard.length < 1) return '';

  return `
    <div class="mt-4 d-flex">
      ${carBoard.map((cardBoardItem) => getCarBoardItemTemplate(cardBoardItem)).join('')}
    </div>
  `;
};

export const getWinnerNamesTemplate = (winnerList) => {
  return `🏆 최종 우승자: ${winnerList.join(', ')} 🏆`;
};
