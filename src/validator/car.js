import { CAR } from "../constants/car";
import { ERROR_MESSAGES } from "../constants/messages";

export const car = {
  nameLengthValidator: (carNames) => {
    if (carNames.some((carName) => carName.length > CAR.NAME_MAX_LENGTH)) {
      throw new Error(ERROR_MESSAGES.CAR_NAME_LENGTH);
    }
  },
};
