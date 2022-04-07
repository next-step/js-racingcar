import { CARD_STATE } from '../constants/index.js';

const getCarBoardItemTemplate = ({ name, stateList }) => {
  return `
    <div class="mr-2">
      <div class="car-player">${name}</div>
      ${stateList
        .filter((state) => state === CARD_STATE.GO)
        .map((state) => '<div class="forward-icon mt-2">⬇️️</div>')
        .join('')}
    </div>
  `;
};

export const getCardBoardTemplate = (carBoard) => {
  return `
    <div class="mt-4 d-flex">
      ${carBoard.map((cardBoardItem) => getCarBoardItemTemplate(cardBoardItem)).join('')}
    </div>
  `;
};
