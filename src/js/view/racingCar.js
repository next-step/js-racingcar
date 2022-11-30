import { $, $all } from '../utils/dom.js';
import { SELECTOR } from '../constants/selector.js';
import { isMoveForwardNumber } from '../utils/validator.js';

export const makeCarTemplate = (carName) => {
  return `<div class="mr-2 js-car-wrapper" data-cy="car-wrapper">
    <div class="car-player js-car-player" data-cy="car-player">${carName}</div>
    <div class='js-car-forward-icon-wrapper' data-car-name="${carName}" data-cy="car-forward-icon-wrapper"></div>
  </div>`;
};

export const makeMoveTemplate = () => {
  return '<div class="forward-icon mt-2">⬇️️</div>';
};

export const makeSpinnerTemplate = () => {
  return `<div class="d-flex justify-center mt-3">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>`;
};

export const getCarName = () => {
  return $(SELECTOR.CAR_NAME_INPUT).value;
};

export const disableCarNameForm = () => {
  $(SELECTOR.CAR_NAME_INPUT).disabled = true;
  $(SELECTOR.CAR_NAME_BUTTON).disabled = true;
};

export const getCarAttemptsCount = () => {
  return Number($(SELECTOR.CAR_ATTEMPTS_COUNT_INPUT).value);
};

export const getCarForwardIconWrapper = () => {
  return Array.from($all(SELECTOR.CAR_FORWARD_ICON_WRAPPER));
};

export const showCarAttemptsCountForm = () => {
  $(SELECTOR.CAR_ATTEMPTS_COUNT_FORM).classList.remove('d-none');
};

export const disableCarAttemptsCountForm = () => {
  $(SELECTOR.CAR_ATTEMPTS_COUNT_INPUT).disabled = true;
  $(SELECTOR.CAR_ATTEMPTS_COUNT_BUTTON).disabled = true;
};

export const showLoadingSpinner = () => {
  $all(SELECTOR.CAR_WRAPPER).forEach(($el) => {
    $el.insertAdjacentHTML('beforeend', makeSpinnerTemplate());
  });
};

export const hideLoadingSpinner = () => {
  $all(SELECTOR.CAR_WRAPPER).forEach(($el) => {
    $el.removeChild($el.lastChild);
  });
};

const showCarRoad = () => {
  $(SELECTOR.CAR_ROAD).classList.remove('d-none');
  $(SELECTOR.CAR_ROAD).classList.add('d-flex');
};

const showWinnersWrapper = () => {
  $(SELECTOR.CAR_WINNERS_CONTAINER).classList.remove('d-none');
  $(SELECTOR.CAR_WINNERS_CONTAINER).classList.add('d-flex');
};

export const renderCarRoad = (carName) => {
  showCarRoad();
  $(SELECTOR.CAR_ROAD_WRAPPER).insertAdjacentHTML('beforeend', carName.map((car) => makeCarTemplate(car)).join(''));
};

export const renderCarStatus = (record) => {
  const carForwardIconWrapper = getCarForwardIconWrapper();

  carForwardIconWrapper.forEach(($el) => {
    const { carName } = $el.dataset;

    if (!isMoveForwardNumber(record[carName])) return;

    $el.insertAdjacentHTML('beforeend', makeMoveTemplate());
  });
};

export const renderWinners = (winners) => {
  showWinnersWrapper();
  $(SELECTOR.CAR_WINNERS_NAME).innerHTML = `${winners}`;
};
