import { CAR_STATE, ERROR, CAR_NAME } from '../constants/index.js';

const checkCarNameIsValid = (carName) => {
  const trimCarName = carName.trim();

  if (!trimCarName) {
    return ERROR.NAME_EMPTY;
  }

  if (trimCarName.length > CAR_NAME.MAX_LENGTH) {
    return ERROR.NAME_MAX_LENGTH;
  }

  return null;
};

export const checkCarNamesIsValid = (carNames) => {
  const errorMessages = carNames.map((carName) => checkCarNameIsValid(carName)).filter((errorMessage) => errorMessage !== null);
  return { errorMessage: errorMessages.length !== 0 ? errorMessages[0] : null };
};

const createForwardState = () => {
  const random = Math.floor(Math.random() * CAR_STATE.MAX_RANDOM_NUMBER);
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

export const getWinners = (carBoard) => {
  const cars = carBoard.map((carState) => ({
    name: carState.name,
    forwardDistance: carState.stateList.filter((state) => state === 'go').length,
  }));
  const maxDistance = Math.max(...cars.map((car) => car.forwardDistance));
  return cars.filter((car) => car.forwardDistance === maxDistance).map((car) => car.name);
};
