import { CAR_NAME_LENGTH_LIMIT } from '../constants/race-rule';

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_ARGUMENT: '인자가 null 또는 undefined입니다.',
  EMPTY_STRING: '최소 한글자 이상의 문자열을 입력해주세요.',
  CAR_NAME_LIMIT: `자동차 이름은 ${CAR_NAME_LENGTH_LIMIT}자리까지 가능합니다.`,
  CAR_RACE_LAP_COUNT: '경주 횟수는 양수로 입력해주세요',
});
