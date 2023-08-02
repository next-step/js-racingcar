import { NAME_CONFIGURE } from './configure';

export const ERROR_MESSAGE = Object.freeze({
  CAR_NAME_INCORRECT_LENGTH: '자동차 이름은 최대 5글자 까지 입력하실 수 있습니다.',
  CAR_NAME_NOT_STRING: '자동차 이름은 문자열 타입만 허용됩니다.',
  DUPLICATE_CAR: '이미 해당 이름으로 참가중인 자동차가 존재합니다.',
  NOT_RECEIVED_CAR_NAME: '참여중인 자동차에 누락된 이름이 존재합니다.',
  NOT_RECEIVED_INPUT: '참여 할 자동차들을 입력해주세요.',
  NOT_RECEIVED_FUNCTION: '리스너 함수는 function 타입만 올 수 있습니다.',
  INVALID_INPUT: '올바르지 않은 입력입니다.'
});

export const ALERT_MESSAGE = Object.freeze({
  INPUT_CAR_MESSAGE: `경주 할 자동차 이름을 입력하세요.(이름은 (${NAME_CONFIGURE.SEPARATOR})를 기준으로 구분)`
});
