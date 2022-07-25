import { VALIDATE_TYPE } from "../constants/index.js";
import { validateAttemptNumber, validateCarName } from "../validates/index.js";
import { $attemptNumberInput, $racingcarNameInput, showAttemptFieldset } from "../views/form.js";
import { renderCarName, showRacingcarSection } from "../views/racing.js";
import { createRacingGame } from "./racing.js";

const validateCarNameOrAttemptNumber = (type, inputValue) => {
  if (type === VALIDATE_TYPE.NAME) {
    validateCarName(inputValue);
    return
  }

  if (type === VALIDATE_TYPE.ATTEMPT) {
    validateAttemptNumber(inputValue);
    return
  }
}

const catchCarNameOrAttemptNumberError = (type, inputValue) => {
  try {
    validateCarNameOrAttemptNumber(type, inputValue)
  } catch (error) {
    return error;
  }
}

export const handleRacingCarNameButton = () => {
  const inputValue = $racingcarNameInput.value;
  const cars = inputValue.split(',');
  const errorMessage = catchCarNameOrAttemptNumberError(VALIDATE_TYPE.NAME, inputValue);

  if (errorMessage) {
    alert(errorMessage)
    return
  }

  showAttemptFieldset();

  renderCarName(cars);
}


export const handleAttemptNumberButton = () => {
  const inputValue = $attemptNumberInput.value;
  const errorMessage = catchCarNameOrAttemptNumberError(VALIDATE_TYPE.ATTEMPT, inputValue);

  if (errorMessage) {
    alert(errorMessage)
    return
  }
  showRacingcarSection();
  createRacingGame(inputValue);
}