const MIN_CAR_NAME_LENGTH = 1;
const MAX_CAR_NAME_LENGTH = 5;

/** 점수 형식 */
export const DEFAULT_SCORE = "-";

/**  자동차 경주는 5회로 고정 */
export const NUM_RACING_ROUNDS = 5;

/**  자동차 이름은 쉼표(,)를 기준 */
export const CAR_NAME_SEPARATOR = ",";

/** 이름은 5자 이하만 가능하다. */
export const CAR_NAME_LENGTH_LIMITS = {
  min: MIN_CAR_NAME_LENGTH,
  max: MAX_CAR_NAME_LENGTH,
};

export const CAR_NAME_INPUT_PROMPT =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

export const RACE_RESULT_MESSAGE = "실행 결과";

/** 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. */
export const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";
