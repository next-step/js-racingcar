import {
  CAR_NAME_LENGTH_MAXIMUM,
  INVALID_CAR_MAXIMUM_NAME,
  INVALID_CAR_NAME,
  INVALID_RACING_MINIMUM_NUMBER,
  INVALID_RACING_NUMBER,
  INVALID_RACING_NUMBER_TYPE,
  RACING_MINIMUM_NUMBER,
} from './constants.js';

const hasCarNameOverMaxLength = (cars) =>
  cars.some((car) => car.trim().length > CAR_NAME_LENGTH_MAXIMUM);

const validate = (predicate, handleError) => {
  if (!predicate) {
    return false;
  }
  handleError();
  return true;
};

const hasErrorCondition = {
  isEmptyCarName: (cars) => cars.length === 0,
  isCarNameMaxLength: (cars) => hasCarNameOverMaxLength(cars.split(',')),
  isEmptyRacingNumber: (number) => number === false,
  isNotNumberType: (number) => typeof number !== 'number',
  isMinRacingNumber: (number) => number < RACING_MINIMUM_NUMBER,
};

const handleError = {
  emptyCarName: () => alert(INVALID_CAR_NAME),
  carNameMaxLength: () => alert(INVALID_CAR_MAXIMUM_NAME),
  emptyRacingNumber: () => alert(INVALID_RACING_NUMBER),
  notNumberType: () => alert(INVALID_RACING_NUMBER_TYPE),
  minRacingNumber: () => alert(INVALID_RACING_MINIMUM_NUMBER),
};

export const carNameValidation = {
  emptyCarName: (cars) =>
    validate(predicate.emptyCarName(cars), handleError.emptyCarName),
  carNameMaxLength: (cars) =>
    validate(predicate.carNameMaxLength(cars), handleError.carNameMaxLength),
};

export const racingNumberValidation = {
  emptyRacingNumber: (number) =>
    validate(
      predicate.emptyRacingNumber(number),
      handleError.emptyRacingNumber
    ),
  notNumberType: (number) =>
    validate(predicate.notNumberType(number), handleError.notNumberType),
  minRacingNumber: (number) =>
    validate(predicate.minRacingNumber(number), handleError.minRacingNumber),
};
