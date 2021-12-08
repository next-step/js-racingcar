import {ERROR_MESSAGES} from "../constants.js";

export const validateCarName = (carName) => {
  if (carName === '') throw Error(ERROR_MESSAGES.NO_CAR_NAMES);
  if (carName.length > 5) throw Error(ERROR_MESSAGES.MAXIMUM_CAR_NAMES_LENGTH);
};