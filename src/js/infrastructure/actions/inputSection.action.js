import {
  pipeline,
  removeSpaceArray,
  isFirstChar,
  isLastChar,
  isDuplicatedArray,
} from '../../@helper/index.js';
import { ERROR_MESSAGE, MAX_NAME_DIGITS } from '../../constants.js';

const intializing = pipeline(
  carNames => carNames.trim(),
  carNames => (isFirstChar(carNames, ',') ? carNames.slice(1) : carNames),
  carNames => (isLastChar(carNames, ',') ? carNames.slice(0, -1) : carNames),
);

const checkValidations = carNames => {
  const checkedLength = carNames.filter(carName => {
    if (carName.length < 1) throw new Error(ERROR_MESSAGE.REQUIRED_NAME);
    if (carName.length > MAX_NAME_DIGITS) throw new Error(ERROR_MESSAGE.MUST_LESS_THAN);
    return carName;
  });

  if (isDuplicatedArray(checkedLength)) throw new Error(ERROR_MESSAGE.NOT_ACCEPT_DUPLICATED);

  return checkedLength;
};

export const inputCarNamesParsing = carNames => {
  const splitedCarNames = pipeline(
    intializing,
    str => str.split(','),
    removeSpaceArray,
    checkValidations,
  );

  return splitedCarNames(carNames);
};
