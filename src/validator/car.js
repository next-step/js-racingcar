import { CAR } from "../constants/car";
import { ERROR_MESSAGES } from "../constants/messages";
import { checkDuplicate } from "../utils/checkDuplicate";
import { limitStrMaxMinLength } from "../utils/limitStrMaxMinLength";

export const car = {
  nameValidator: carNamesArr => {
    const hasInvalidLength = carNamesArr.some(
      carName =>
        !limitStrMaxMinLength(
          carName,
          CAR.NAME_MIN_LENGTH,
          CAR.NAME_MAX_LENGTH,
        ),
    );

    if (hasInvalidLength) {
      throw new Error(ERROR_MESSAGES.CAR_NAME_LENGTH);
    }

    if (checkDuplicate(carNamesArr)) {
      throw new Error(ERROR_MESSAGES.SAME_CAR_NAME);
    }
  },
};
