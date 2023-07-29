import { SETTINGS } from './settings.js';

export const MESSAGES = Object.freeze({
  ERROR: {
    NO_NAME: '이름을 입력해주세요.',
    MAX_NAME_LENGTH: `이름은 ${SETTINGS.MAX.NAME_LENGTH}자 이하만 가능합니다.`,
    MIN_NAME_LENGTH: `이름은 ${SETTINGS.MIN.NAME_LENGTH}자 이상만 가능합니다.`,
  },
  GAME: {
    START_PROMPT: `경주할 자동차 이름을 입력하세요(이름은 쉼표(${SETTINGS.SEPERATOR})를 기준으로 구분).`,
    RESULT_HEADER: '실행 결과',
    WINNER_ANNOUNCEMENT: '가 최종 우승했습니다.',
  },
});
