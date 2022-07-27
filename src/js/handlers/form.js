import { validateAttemptNumber, validateCarName } from "../validates/index.js";
import { $attemptNumberInput, $racingcarNameInput, showAttemptFieldset } from "../views/form.js";
import { renderCarName, renderRacingGame, showRacingcarSection } from "../views/racing.js";
import { runRacingGame } from "./racing.js";

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

  try {
    validateAttemptNumber(inputValue);
  } catch (error) {
    alert(error);
    return
  }

  showRacingcarSection();
  runRacingGame(inputValue, cars, renderRacingGame);
}
