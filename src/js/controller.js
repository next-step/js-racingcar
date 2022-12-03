import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE} from "../js/constants/constants.js";
import {isValidation, getCarNamesArr} from "../js/model.js";
import {showElement, lockElement, resetElement} from "./utils/index.js";
import {handleCarViewAndRace, startRacingCar} from "./view.js";

export const handleCarNamesInput = (event) => {
  event.preventDefault();

  if (isValidation(DOM.CAR_NAMES_ID_INPUT.value)) {
    lockElement(DOM.CAR_NAMES_ID_INPUT);
    lockElement(DOM.CAR_NAMES_SUBMIT_BTN);
    handleNumberOfAttempts();
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    resetElement(DOM.CAR_NAMES_ID_INPUT);
  }
};

export const handleNumberOfAttempts = () => {
  showElement(DOM.NUMBER_OF_ATTEMPTS_FIELDSET);
};

export const handleLockAttemptInputAndBtn = (event) => {
  event.preventDefault();

  lockElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
  lockElement(DOM.NUMBER_OF_ATTEMPTS_BTN);

  handleCarViewAndRace(
    getCarNamesArr(DOM.CAR_NAMES_ID_INPUT),
    DOM.RACING_CAR_RENDER_SECTION
  );
  progressRacingCar(getCarNamesArr(DOM.CAR_NAMES_ID_INPUT));
};

export const progressRacingCar = (racingCar, count = 1) => {
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;
  startRacingCar(racingCar);

  const intervalId = setInterval(() => {
    const isFinishRacing = count++ === numberOfAttempts;
    startRacingCar(racingCar);

    if (isFinishRacing) {
      clearInterval(intervalId);
    }
  }, 5000);
};
