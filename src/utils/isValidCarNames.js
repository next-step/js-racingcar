export const isValidCarNames = carNames => {
  const MAXIMUM_CAR_NAME_LENGTH = 5;
  return carNames.every(carName => carName.length <= MAXIMUM_CAR_NAME_LENGTH);
};
