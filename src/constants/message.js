import { SEPERATOR_SYMBOLS } from './commons.js';

export const INPUT_MESSAGE = Object.freeze({
  RACING_CAR: `경주할 자동차 이름을 입력하세요(이름은 쉼표(${SEPERATOR_SYMBOLS.COMMA})를 기준으로 구분).\n`,
});

export const ERROR_MESSAGE = {
  INVALID_RANGE: (min, max) => `[ERROR] : 자동차 이름은 ${min}~${max}자 사이로 입력해주세요.`,
  DUPLICATE_CAR_NAMES: '[ERROR] : 중복된 자동차 이름이 존재합니다.',
  NOT_MESSAGE: '[ERROR] - 입력 받을 메시지가 없습니다.',
  INCLUDE_EMPTY_WORDS: '[ERROR] : 입력한 자동차 이름에 공백이 존재합니다. 공백 없이 입력해주세요.',
  AVALIABLE_CHARACTER: '[ERROR] : 자동차 이름은 영문자만 가능합니다.',
};

export const OUTPUT_MESSAGE = Object.freeze({
  RESULT: '\n실행 결과',
  WINNERS: (winners) => `${winners}가 최종 우승했습니다.`,
});
