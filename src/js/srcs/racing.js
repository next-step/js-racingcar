import { $ } from "../utils/DOM.js";
import { winner } from "./winner.js";
import { state } from "./../utils/state.js";
import { randomNumber } from "../utils/randomNumber.js";
import { NUMBERIC_CONDITIONS } from "./../utils/constants.js";

const spinnerHtml = `<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;

const carPositioning = () => {
  state.cars.map((car) => {
    if (randomNumber() >= NUMBERIC_CONDITIONS.TERMS_OF_ADVANCE) {
      car.position++;
    }
  });
};

const createCarRacing = () => {
  return state.cars.map((car) => {
    return `
    <div  class="mt-4 d-flex">
      <div class="mr-2">
        <div class="car-player">${car.name}</div>
        ${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(car.position)}
        ${state.racingTimes > 0 ? spinnerHtml : ""}
      </div>
    </div>
    `;
  });
};

const startRacing = () => {
  let startTime = new Date().getTime();
  let i = state.racingTimes;

  const callback = () => {
    const currentTime = new Date().getTime();
    if (currentTime - 1000 > startTime) {
      startTime = currentTime;
      state.racingTimes--;
      i--;

      if (i < 0) return;

      carPositioning();
      $("#carRacingWrap").innerHTML = createCarRacing();
      if (i === 0) winner();
    }
    requestAnimationFrame(callback);
  };

  requestAnimationFrame(callback);
};

export const racing = () => {
  $("#carRacingWrap").innerHTML = createCarRacing();
  startRacing();
};
