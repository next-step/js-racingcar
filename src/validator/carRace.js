import { ERROR_MESSAGES } from "../constants/messages";

export const carRace = {
  tryCountValidator: tryCount => {
    if (!Number.isInteger(tryCount)) {
      throw new Error(ERROR_MESSAGES.TRY_COUNT_NUMBER);
    }

    if (tryCount < 1) {
      throw new Error(ERROR_MESSAGES.TRY_COUNT_MIN);
    }
  },
};
