import { CAR_STATE, ERROR, NUMBER } from '../constants/index.js';

const checkCarNameIsValid = (carName) => {
  if (!carName.trim()) {
    return ERROR.NAME_EMPTY;
  }

  if (carName.length > NUMBER.NAME_MAX_LENGTH) {
    return ERROR.NAME_MAX_LENGTH;
  }

  return null;
};

export const checkCarNamesIsValid = (carNames) => {
  const errorMessages = carNames.map((carName) => checkCarNameIsValid(carName)).filter((errorMessage) => errorMessage !== null);
  return { errorMessage: errorMessages.length !== 0 ? errorMessages[0] : null };
};

const createForwardState = () => {
  const random = Math.floor(Math.random() * 10);
  return random > NUMBER.MAX_STOP_VALUE ? CAR_STATE.GO : CAR_STATE.STOP;
};

export const createCarBoard = ({ names, count }) => {
  const carBoard = names.map((name) => {
    return {
      name,
      stateList: Array.from({ length: count }, () => createForwardState()),
    };
  });

  return carBoard;
};
