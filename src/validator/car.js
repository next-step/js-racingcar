import { CAR } from "../constants/car";
import { ERROR_MESSAGES } from "../constants/messages";

export const car = {
  nameMaxLengthValidator: (carNames) => {
    if (carNames.some((carName) => carName.length > CAR.NAME_MAX_LENGTH)) {
      throw new Error(ERROR_MESSAGES.CAR_MAX_NAME_LENGTH);
    }
  },
  nameMinLengthValidator: (carNames) => {
    if (carNames.some((carName) => carName.length < CAR.NAME_MIN_LENGTH)) {
      throw new Error(ERROR_MESSAGES.CAR_MIN_NAME_LENGTH);
    }
  },
  sameNameValidator: (carNames) => {
    carNames.reduce((acc, carName) => {
      if (acc.includes(carName)) {
        throw new Error(ERROR_MESSAGES.SAME_CAR_NAME);
      }
      acc.push(carName);
      return acc;
    }, []);
  },
};
