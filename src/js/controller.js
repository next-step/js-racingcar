import {DOM} from "./constants/dom.js";
import {ALERT_MESSAGE, CAR} from "../js/constants/constants.js";
import {getCarClassList, extractWinner} from "./model/model.js";
import {validateCarNames, validateAttempts} from "./model/validation.js";
import {
  $$,
  disabledElement,
  ableElement,
  clearElementValue,
  clearElementInnerHTML,
  showElement,
  getRandomNumber,
  hideElement,
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

/** @TODO 여기부터 잡아보기 */
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
      renderForwardIcon(car.lastChild);
    } else {
      renderSpinnerIcon(car.lastChild);
    }
  });
};

export const handleSubmitResetBtn = () => {
  /**@TODO model view 분리하기 */
  clearElementValue(DOM.CAR_NAMES_ID_INPUT);
  clearElementValue(DOM.NUMBER_OF_ATTEMPTS_INPUT);
  clearElementInnerHTML(DOM.RACING_CAR_RENDER_SECTION);

  ableElement(DOM.CAR_NAMES_ID_INPUT);
  ableElement(DOM.CAR_NAMES_SUBMIT_BTN);
  ableElement(DOM.NUMBER_OF_ATTEMPTS_INPUT);
  ableElement(DOM.NUMBER_OF_ATTEMPTS_BTN);

  hideElement(DOM.NUMBER_OF_ATTEMPTS_FIELDSET);
  hideElement(DOM.RACING_WINNER_RENDER_SECTION);
};
