import { CAR_NAME_LENGTH_LIMIT } from '../constants';

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_STRING: '최소 한글자 이상의 문자열을 입력해주세요.',
  CAR_NAME_LIMIT: `자동차 이름은 ${CAR_NAME_LENGTH_LIMIT}자리까지 가능합니다.`,
});
