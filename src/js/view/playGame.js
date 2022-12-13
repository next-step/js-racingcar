import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

// const moveTemplate = /* html */ `<div class="forward-icon mt-2">⬇️️</div>`;
// const stopTemplate = /* html */ `
//     <div class="d-flex justify-center mt-3">
//       <div class="relative spinner-container">
//         <span class="material spinner"></span>
//       </div>
//     </div>`;
const carNameTemplate = ({ carName, id }) => /* html */ `
    <div class="mr-2" id="${id}">
      <div class="car-player">${carName}</div>
    </div>`;

export const showPlayGame = (cars) => {
  const template = cars
    .map((car, idx) => carNameTemplate({ carName: car.getName(), id: idx }))
    .join('');

  $(SELECTOR.PLAY_GAME).innerHTML = template;
};
