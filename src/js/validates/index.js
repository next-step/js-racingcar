import { ALERT_MESSAGES, MIN_ATTEMPT_NUMBER } from "../constants/index.js";

export const  validateCarName = (inputValue) => {
  const cars = inputValue.split(',');
  const isUpperMaxLength = cars.some((car) => car.trim().length > 5)

  if (inputValue === '') {
    throw ALERT_MESSAGES.NAME.EMPTY;
  }

  if (isUpperMaxLength) {
    throw ALERT_MESSAGES.NAME.MAX_LENGTH;
  }
}

export const validateAttemptNumber = (inputValue) => {
  if (inputValue === '') {
    throw ALERT_MESSAGES.ATTEMPT.EMPTY;
  }

  if (inputValue < MIN_ATTEMPT_NUMBER) {
    throw ALERT_MESSAGES.ATTEMPT.POSITIVE_NUMBER;
  }
}