import { $, SELECTOR } from '../utils/selector.js';

export const visibleRaceTimes = () => {
  $(SELECTOR.RACE_TIMES_SECTION).style.display = 'block';
};

export const disableCarName = () => {
  $(SELECTOR.CAR_NAME_INPUT).disabled = true;
  $(SELECTOR.CAR_NAME_BUTTON).disabled = true;
};

export const enableCarName = () => {
  $(SELECTOR.CAR_NAME_INPUT).disabled = false;
  $(SELECTOR.CAR_NAME_BUTTON).disabled = false;
};

export const disableTrialNumber = () => {
  $(SELECTOR.TRIAL_NUMBER_INPUT).disabled = true;
  $(SELECTOR.TRIAL_NUMBER_BUTTON).disabled = true;
};

export const enbleTrialNumber = () => {
  $(SELECTOR.TRIAL_NUMBER_INPUT).disabled = false;
  $(SELECTOR.TRIAL_NUMBER_BUTTON).disabled = false;
};

export const getCarName = () => {
  return $(SELECTOR.CAR_NAME_INPUT)
    .value.split(',')
    .map((name) => name.trim());
};

export const getTrialTimes = () => {
  return parseInt($(SELECTOR.TRIAL_NUMBER_INPUT).value);
};

export const createCarElement = (carName) => {
  return `<div class="car-player" id="${carName}">${carName}</div>`;
};

export const createSpinnerElement = () => {
  return `<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;
};

export const createForwardElement = () => {
  return `<div class="forward-icon mt-2">⬇️️</div>`;
};

export const renderRace = () => {
  $(SELECTOR.RACE_PROCESS_COMPONENT).replaceChildren();
  const template = `<section class="d-flex justify-center mt-5">
    <div class="mt-4 d-flex">${getCarName().map(
      (name) => `
      <div class="mr-2 ${name}">
        ${createCarElement(name)}
      </div>
    `
    )}
    </section>
  `;
  $(SELECTOR.RACE_PROCESS_COMPONENT).insertAdjacentHTML('afterbegin', template);
};

export const renderWinner = (winner) => {
  const template = `
  <section class="d-flex justify-center mt-5">
    <div>
      <h2>🏆 최종 우승자: ${winner.join(',')} 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  </section>`;

  $(SELECTOR.RACE_RESULT_COMPONENT).insertAdjacentHTML('afterbegin', template);
};
