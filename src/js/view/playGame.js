import { SELECTOR } from '../constants/selector.js';

import { $, $$ } from '../utils/dom.js';

const TEMPLATE = {
  CAR_NAME: (carName) => /* html */ `<div class="car-player">${carName}</div>`,
  MOVE: /* html */ `<div class="forward-icon mt-2">⬇️️</div>`,
  STOP: /* html */ `
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
        ${TEMPLATE.CAR_NAME(car.getName())}
        ${TEMPLATE.STOP}
      </div>`
    )
    .join('');

  $(SELECTOR.PLAY_GAME).innerHTML = initialTemplate;
};

export const showGamePlay = () => {
  if ($(SELECTOR.PLAY_GAME).classList.contains('display-none')) {
    $(SELECTOR.PLAY_GAME).classList.remove('display-none');
  }
};

export const hideGamePlay = () => {
  $(SELECTOR.PLAY_GAME).classList.add('display-none');
};

export const showMoving = (car) => {
  const carName = car.getName();

  $(`.record-${carName}`).lastElementChild.remove();
  $(`.record-${carName}`).insertAdjacentHTML('beforeend', TEMPLATE.MOVE);
  $(`.record-${carName}`).insertAdjacentHTML('beforeend', TEMPLATE.STOP);
};

export const removeAllSpinners = () => {
  $$('.spinner-container').forEach(($el) => {
    $el.parentElement.remove();
  });
};
