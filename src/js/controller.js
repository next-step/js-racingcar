import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE} from "../js/constants/constants.js";
import {
  validateCarNames,
  validateAttempts,
  getCarNamesArr,
} from "../js/model.js";
import {lockElement, resetElement} from "./utils/index.js";
import {
  handleNumberOfAttempts,
  handleCarViewAndRace,
  startRacingCar,
} from "./view.js";

export const handleCarNamesInput = (event) => {
  event.preventDefault();

  if (validateCarNames(DOM.CAR_NAMES_ID_INPUT.value)) {
    lockElement(DOM.CAR_NAMES_ID_INPUT);
    lockElement(DOM.CAR_NAMES_SUBMIT_BTN);
    handleNumberOfAttempts(DOM.NUMBER_OF_ATTEMPTS_FIELDSET);
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    resetElement(DOM.CAR_NAMES_ID_INPUT);
  }
};

export const handleLockAttemptInputAndBtn = (event) => {
  event.preventDefault();
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;

  if (validateAttempts(numberOfAttempts)) {
    lockElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
    lockElement(DOM.NUMBER_OF_ATTEMPTS_BTN);

    handleCarViewAndRace(
      getCarNamesArr(DOM.CAR_NAMES_ID_INPUT),
      DOM.RACING_CAR_RENDER_SECTION
    );
    progressRacingCar(getCarNamesArr(DOM.CAR_NAMES_ID_INPUT));
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_NUMBER_OF_ATTEMPTS);
    resetElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
  }
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
