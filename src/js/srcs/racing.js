import { $ } from "../utils/DOM.js";
import { winner } from "./winner.js";
import { state } from "./../utils/state.js";
import { randomNumber } from "../utils/randomNumber.js";
import {
  NUMBERIC_CONDITIONS,
  RACING_TIME_INTERVAL,
} from "./../utils/constants.js";

const beforeStartRacingHtml = () => {
  return state.cars.reduce((acc, car) => {
    return (
      acc +
      `<div  class="mt-4 d-flex">
        <div class="mr-2">
          <div class="car-player">${car.name}</div>
          <div class="forwardIcon"></div>
          <div class="spinnerWrap d-flex justify-center mt-3">
            <div class="relative spinner-container">
              <span class="material spinner"></span>
            </div>
          </div>
        </div>
      </div>`
    );
  }, "");
};

const removeSpinner = () => {
  state.cars.map((v, i) => {
    document
      .getElementsByClassName("mt-4")
      [i].getElementsByClassName("spinnerWrap")[0]
      .classList.add("hidden");
  });
};

export const carsPositioning = (cars) => {
  cars.map((car) => {
    const number = randomNumber();
    car.number = number;
    if (number >= NUMBERIC_CONDITIONS.TERMS_OF_ADVANCE) car.position++;
  });
};

const createCarRacing = () => {
  state.cars.map((v, i) => {
    const forwardIcon = `${'<div class="forward-icon mt-2">⬇️️</div>'.repeat(
      state.cars[i].position
    )}`;

    document
      .getElementsByClassName("mt-4")
      [i].getElementsByClassName("forwardIcon")[0].innerHTML = forwardIcon;
  });
};

const startRacing = () => {
  let startTime = new Date().getTime();

  const callback = () => {
    const currentTime = new Date().getTime();

    if (currentTime - RACING_TIME_INTERVAL > startTime) {
      startTime = currentTime;
      state.racingTimes--;

      carsPositioning(state.cars);
      createCarRacing();

      if (state.racingTimes === 0) {
        removeSpinner();
        return winner();
      }
    }
    requestAnimationFrame(callback);
  };
  requestAnimationFrame(callback);
};

export const racing = () => {
  $("#carRacingWrap").innerHTML = beforeStartRacingHtml();
  startRacing();
};
