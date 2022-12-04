import { $attemptNumberInput, $carNameInput } from './utils/dom.js';
import racingAdmin from './racingAdmin.js';
import { isCorrectRange, isCorrectNumberRange } from './validate.js';
import { ALERT_ERROR_MESSAGE } from './constants.js';

export const handleCarNameButton = (e) => {
  e.preventDefault();
  const inputValues = $carNameInput.value;
  const trimInputValue = racingAdmin.trimValue(inputValues);
  const carNames = racingAdmin.splitComma(trimInputValue);

  if (!isCorrectRange(carNames)) {
    return alert(ALERT_ERROR_MESSAGE.UNCORRECT_RANGE);
  }
  racingAdmin.setCarName(carNames);
  racingAdmin.setPosition(carNames);
};

export const handleAttemptNumber = (e) => {
  e.preventDefault();
  const attemptNumberInputValue = +$attemptNumberInput.value;

  if (!isCorrectNumberRange(attemptNumberInputValue)) {
    return alert(ALERT_ERROR_MESSAGE.UNCORRECT_NUMBER_RANGE);
  }
  racingAdmin.setCount(attemptNumberInputValue);
  racingAdmin.setResult();
  racingAdmin.showResult();
  // racingAdmin.startGame();
};
