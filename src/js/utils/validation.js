import { ERROR_MESSAGES } from "../constants.js";

const isValidCarNames = (carNames) => {
  if (!carNames) throw new Error(ERROR_MESSAGES.INVALID_INPUT);

  if (
    carNames.some((carName) => {
      const trimmedName = carName.trim();
      return trimmedName.length > 5 || trimmedName.length <= 0;
    })
  ) {
    throw new Error(ERROR_MESSAGES.INVALID_INPUT);
  }

  return true;
};

export { isValidCarNames };
