import { validateAttemptNumber, validateCarName } from "../validates/index.js";
import { $attemptNumberInput, $racingcarNameInput, hideAttemptFieldset, showAttemptFieldset } from "../views/form.js";
import { hideRacingcarSection, hideResultSection, renderCarName, renderRacingGame, renderWinners, showRacingcarSection, showResultSection } from "../views/racing.js";
import { getRacingResult, getWinners } from "./racing.js";

export const handleRacingCarNameButton = () => {
  const inputValue = $racingcarNameInput.value;
  const cars = inputValue.split(',');

  try {
    validateCarName(inputValue);
  } catch (error) {
    alert(error);
    return
  }

  showAttemptFieldset();

  renderCarName(cars);
}

export const handleAttemptNumberButton = () => {
  const cars = $racingcarNameInput.value.split(',');
  const inputValue = $attemptNumberInput.value;
  const result = getRacingResult(inputValue, cars);

  try {
    validateAttemptNumber(inputValue);
  } catch (error) {
    alert(error);
    return
  }
  showRacingcarSection();
  renderRacingGame(result);
  showResultSection();
  renderWinners(getWinners(cars))
}

export const handleResetButton = () => {
  $racingcarNameInput.value = ''
  $attemptNumberInput.value = ''
  hideAttemptFieldset();
  hideRacingcarSection();
  hideResultSection();
}
