import { $ } from "../utils/DOM.js";
import { winner } from "./winner.js";
import { state } from "./../utils/state.js";
import { randomNumber } from "../utils/randomNumber.js";
import {
  NUMBERIC_CONDITIONS,
  RACING_TIME_INTERVAL,
} from "./../utils/constants.js";

const spinnerHtml = `<div class="d-flex justify-center mt-3">
  <div class="relative spinner-container">
    <span class="material spinner"></span>
  </div>
</div>`;

export const carsPositioning = (cars) => {
  cars.map((car) => {
    const number = randomNumber();
    car.number = number;
    if (number >= NUMBERIC_CONDITIONS.TERMS_OF_ADVANCE) car.position++;
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

  const callback = () => {
    const currentTime = new Date().getTime();

    if (currentTime - RACING_TIME_INTERVAL > startTime) {
      console.log("startTime", startTime, "currentTime", currentTime);
      startTime = currentTime;
      state.racingTimes--;

      carsPositioning(state.cars);
      $("#carRacingWrap").innerHTML = createCarRacing().join("");
      if (state.racingTimes === 0) return winner();
    }
    requestAnimationFrame(callback);
  };
  requestAnimationFrame(callback);
};

export const racing = () => {
  $("#carRacingWrap").innerHTML = createCarRacing().join("");
  startRacing();
};
