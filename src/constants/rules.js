export const MIN_CAR_NAME_LENGTH = 1;
export const MAX_CAR_NAME_LENGTH = 5;

export const MIN_RANDOM_NUMBER = 0;
export const MAX_RANDOM_NUMBER = 9;

/** 전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다. */
export const RACE_FORWARD_RANDOM_NUMBER_LIMIT = 4;
/**  자동차 경주는 5회로 고정 */
export const NUM_RACING_ROUNDS = 5;

/**  자동차 이름은 쉼표(,)를 기준 */
export const CAR_NAME_SEPARATOR = ",";

export const CAR_NAME_INPUT_PROMPT =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

export const RACE_RESULT_MESSAGE = "실행 결과";

/** 자동차 경주 게임을 완료한 후 누가 우승했는지를 알려준다. */
export const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";
