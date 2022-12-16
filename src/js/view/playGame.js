import { SELECTOR } from '../constants/selector.js';

import { $, $$ } from '../utils/dom.js';

const template = {
  carName: (carName) => /* html */ `<div class="car-player">${carName}</div>`,
  move: /* html */ `<div class="forward-icon mt-2">⬇️️</div>`,
  stop: /* html */ `
    <div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>`,
};

export const showCarNames = (cars) => {
  const initialTemplate = cars
    .map(
      (car) => /* html */ `
      <div class="mr-2 record-${car.getName()}">
        ${template.carName(car.getName(car.getName()))}
        ${template.stop}
      </div>`
    )
    .join('');

  $(SELECTOR.PLAY_GAME).innerHTML = initialTemplate;
};

export const showMoving = (car) => {
  const carName = car.getName();

  $(`.record-${carName}`).lastElementChild.remove();
  $(`.record-${carName}`).insertAdjacentHTML('beforeend', template.move);
  $(`.record-${carName}`).insertAdjacentHTML('beforeend', template.stop);
};

export const removeAllSpinners = () => {
  $$('.spinner-container').forEach(($el) => {
    $el.parentElement.remove();
  });
};
