import { SELECTORS } from './constant.js';

export const templateRaceLapFieldset = () => {
  const raceLapInputId = SELECTORS.RACE_LAP_INPUT.substring(1);
  const raceLapSubmitButtonId = SELECTORS.RACE_LAP_SUBMIT_BUTTON.substring(1);

  return `
    <fieldset>
      <p>시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" id="${raceLapInputId}" class="w-100 mr-2" placeholder="시도 횟수" />
        <button type="button" id="${raceLapSubmitButtonId}" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  `;
};

export const templateRaceTrack = () => {
  const raceTrackId = SELECTORS.RACE_TRACK.substring(1);

  return `
    <section class="d-flex justify-center mt-5">
      <div id="${raceTrackId}" class="mt-4 d-flex"></div>
    </section>
  `;
};

export const templateRacePlayer = (name) => {
  return `
    <div data-player="${name}" class="mr-2">
      <div class="car-player">${name}</div>
    </div>
  `;
};

export const templateRaceAdvance = () => {
  return `<div class="forward-icon mt-2">⬇️️</div>`;
};

export const templateRaceSpinner = () => {
  return `
    <div class="spinner-container mt-3">
        <span class="material spinner"></span>
    </div>
  `;
};
