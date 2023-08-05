import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, SEPERATOR } from './settings.js';

export const MESSAGES = Object.freeze({
  ERROR: {
    NO_NAME: '이름을 입력해주세요.',
    MAX_NAME_LENGTH: `이름은 ${NAME_MAX_LENGTH}자 이하만 가능합니다.`,
    MIN_NAME_LENGTH: `이름은 ${NAME_MIN_LENGTH}자 이상만 가능합니다.`,
    IS_NOT_NUMBER: '숫자만 입력해주세요.',
  },
  GAME: {
    START_PROMPT: `경주할 자동차 이름을 입력하세요(이름은 쉼표(${SEPERATOR})를 기준으로 구분).`,
    ROUND_HEADER: '시도할 회수는 몇회인가요?',
    RESULT_HEADER: '실행 결과',
    WINNER_ANNOUNCEMENT: '가 최종 우승했습니다.',
  },
});
