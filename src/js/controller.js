import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE, CAR} from "../js/constants/constants.js";
import {
  validateCarNames,
  validateAttempts,
  getCarNamesArr,
} from "../js/model.js";
import {disabledElement, resetElement, showElement} from "./utils/index.js";
import {handleCarViewAndRace, startRacingCar} from "./view.js";

export const handleSubmitCarNames = (event) => {
  event.preventDefault();

  if (validateCarNames(DOM.CAR_NAMES_ID_INPUT.value)) {
    disabledElement(DOM.CAR_NAMES_ID_INPUT);
    disabledElement(DOM.CAR_NAMES_SUBMIT_BTN);
    showElement(DOM.NUMBER_OF_ATTEMPTS_FIELDSET);
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    resetElement(DOM.CAR_NAMES_ID_INPUT);
  }
};

export const handleSubmitAttempts = (event) => {
  event.preventDefault();
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;

  if (validateAttempts(numberOfAttempts)) {
    disabledElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
    disabledElement(DOM.NUMBER_OF_ATTEMPTS_BTN);

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

export const progressRacingCar = (racingCar, step = 1) => {
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;

  startRacingCar(racingCar);

  const intervalId = setInterval(() => {
    const isFinishRacing = step++ === numberOfAttempts;
    startRacingCar(racingCar);

    if (isFinishRacing) {
      clearInterval(intervalId);
    }
  }, CAR.PROGRESSIVE_TIME);
};
