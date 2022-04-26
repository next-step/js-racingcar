export const CAR_NAME = {
  MIN_LENGTH: 1,
  MAX_LENGTH: 5,
};

export const CAR_STATE = {
  FORWARD: 'forward',
  STOP: 'stop',
  PARK: 'park',
  MAX_RANDOM_NUMBER: 10,
  MAX_STOP_VALUE: 3,
};

export const ERROR = {
  NAME_EMPTY: `자동차 이름은 ${CAR_NAME.MIN_LENGTH}글자 이상 ${CAR_NAME.MAX_LENGTH}글자 이하로 입력 가능합니다.`,
  NAME_MAX_LENGTH: `자동차 이름은 ${CAR_NAME.MAX_LENGTH}글자 이하로 작성 가능합니다.`,
};

export const TIME = {
  CAR_DELAY: 1000,
  RESULT_ALERT: 2000,
};

export const END_MESSAGE = '🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇';
