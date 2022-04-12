import { CAR_STATE, ERROR, CAR_NAME, MAX_RANDOM_NUMBER } from '../constants/index.js';

const checkCarNameIsValid = (carName) => {
  if (!carName.trim()) {
    return ERROR.NAME_EMPTY;
  }

  if (carName.length > CAR_NAME.MAX_LENGTH) {
    return ERROR.NAME_MAX_LENGTH;
  }

  return null;
};

export const checkCarNamesIsValid = (carNames) => {
  const errorMessages = carNames.map((carName) => checkCarNameIsValid(carName)).filter((errorMessage) => errorMessage !== null);
  return { errorMessage: errorMessages.length !== 0 ? errorMessages[0] : null };
};

const createForwardState = () => {
  const random = Math.floor(Math.random() * MAX_RANDOM_NUMBER);
  return random > CAR_STATE.MAX_STOP_VALUE ? CAR_STATE.GO : CAR_STATE.STOP;
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
