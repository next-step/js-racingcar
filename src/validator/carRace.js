import { ERROR_MESSAGES } from "../constants/messages";

export const carRace = {
  tryCountValidator: tryCount => {
    if (tryCount < 1) {
      throw new Error(ERROR_MESSAGES.TRY_COUNT_MIN);
    }
  },
};
