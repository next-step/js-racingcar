import { NAME_CONFIGURE, ERROR_MESSAGE } from '../constants/index';
import isDuplicateArray from './array';

const { CAR_NAME_NOT_STRING, CAR_NAME_INCORRECT_LENGTH, NOT_RECEIVED_INPUT, DUPLICATE_CAR } =
  ERROR_MESSAGE;

const isString = (string) => typeof string === 'string';
const isAvailableCarNameLength = (string) => {
  const { MAX_LENGTH, MIN_LENGTH } = NAME_CONFIGURE;
  return string.length >= MIN_LENGTH && string.length <= MAX_LENGTH;
};

/**
 * 자동차 이름 규칙을 충족하는 유효성 검사. (문자열, 최대 5글자)
 * @param {string} name : 자동차 이름
 */
export const validateCarName = (name) => {
  if (!isString(name)) {
    throw new Error(CAR_NAME_NOT_STRING);
  }

  if (!isAvailableCarNameLength(name)) {
    throw new Error(CAR_NAME_INCORRECT_LENGTH);
  }
};

/**
 * 경주에 참여하는 자동차 리스트를 순회하며 자동차 이름 규칙을 검증한다.
 * @param {string} input: 사용자에게 입력받은 참여 자동차 리스트
 * @param {string} separator: 구분자
 */
export const validateInputToCarRacers = (input, separator = NAME_CONFIGURE.SEPARATOR) => {
  if (!input) {
    throw new Error(NOT_RECEIVED_INPUT);
  }
  const carRacers = input.split(separator);
  carRacers.forEach((carRacer) => {
    validateCarName(carRacer);
  });

  if (isDuplicateArray(carRacers)) {
    throw new Error(DUPLICATE_CAR);
  }
};
