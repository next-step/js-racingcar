import {isExistEmptyText} from '../utils/isExistEmptyText';
import {isExistOverLengthText} from '../utils/isExistOverLengthText';
import {splitByComma} from '../utils/splitByComma';
export const MAXIMUM_CAR_NAME_LENGTH = 5;

export const VALIDATE_CAR_NAMES_ERRORS = {
  EMPTY_CAR_NAME: '자동차 이름을 입력해주세요.',
  OVER_LENGTH: `${MAXIMUM_CAR_NAME_LENGTH}자 이하의 자동차 이름만 입력해주세요`,
};

export const validateCarNames = carNamesInput => {
  const carNames = splitByComma(carNamesInput);

  if (isExistEmptyText(carNames)) {
    throw new Error(CAR_NAMES_ERRORS.EMPTY_CAR_NAME);
  }

  if (isExistOverLengthText(carNames, MAXIMUM_CAR_NAME_LENGTH)) {
    throw new Error(CAR_NAMES_ERRORS.OVER_LENGTH);
  }
};
