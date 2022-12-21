import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE, CAR} from "../js/constants/constants.js";
import {
  getCarClassList,
  extractWinner,
  resetRacingCarModel,
} from "./model/model.js";
import {validateCarNames, validateAttempts} from "./model/validation.js";
import {
  $$,
  disabledElement,
  clearElementValue,
  showElement,
  getRandomNumber,
} from "./utils/index.js";
import {
  renderRacingCar,
  removePrevSpinner,
  renderSpinnerIcon,
  renderForwardIcon,
  renderGameResult,
  renderCongratulatoryMessage,
  removeAllSpinnerIcon,
  renderAllSpinnerIcon,
  resetRacingCarView,
} from "./view.js";

export const handleSubmitCarNames = (event) => {
  event.preventDefault();

  if (validateCarNames(DOM.CAR_NAMES_ID_INPUT.value)) {
    disabledElement(DOM.CAR_NAMES_ID_INPUT);
    disabledElement(DOM.CAR_NAMES_SUBMIT_BTN);
    showElement(DOM.NUMBER_OF_ATTEMPTS_FIELDSET);
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_CAR_NAMES);
    clearElementValue(DOM.CAR_NAMES_ID_INPUT);
  }
};

export const handleSubmitAttempts = (event) => {
  event.preventDefault();
  const numberOfAttempts = DOM.NUMBER_OF_ATTEMPTS_INPUT.valueAsNumber;

  if (validateAttempts(numberOfAttempts)) {
    disabledElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
    disabledElement(DOM.NUMBER_OF_ATTEMPTS_BTN);

    renderRacingCar(
      getCarClassList(DOM.CAR_NAMES_ID_INPUT),
      DOM.RACING_CAR_RENDER_SECTION
    );
    progressRacingCar(
      getCarClassList(DOM.CAR_NAMES_ID_INPUT),
      numberOfAttempts
    );
  } else {
    alert(ALERT_MESSAGE.INVALID_INPUT_NUMBER_OF_ATTEMPTS);
    clearElementValue(DOM.NUMBER_OF_ATTEMPTS_INPUT);
  }
};

export const progressRacingCar = (racingCar, attempts) => {
  let step = 0;
  renderAllSpinnerIcon();

  const intervalId = setInterval(() => {
    const isFinishRacing = step++ === attempts - 1;
    startRacingCar(racingCar);

    if (isFinishRacing) {
      clearInterval(intervalId);
      removeAllSpinnerIcon();
      renderGameResult(extractWinner(racingCar));
      renderCongratulatoryMessage();
    }
  }, CAR.PROGRESSIVE_TIME);
};

export const startRacingCar = (racingCars) => {
  $$(".car").forEach((car, idx) => {
    removePrevSpinner(car);

    let randomNumber = getRandomNumber(0, 9);

    if (CAR.GO_OR_STOP_STANDARD < randomNumber) {
      racingCars[idx].forward(1);
      renderForwardIcon(car);
    } else {
      renderSpinnerIcon(car);
    }
  });
};

export const handleSubmitResetBtn = () => {
  resetRacingCarView();
  resetRacingCarModel();
};
