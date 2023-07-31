// GameController 관련 setting 상수
export const GAME_INIT_ROUND = 1;
export const TOTAL_GAME_ROUNDS = 5;
export const CAR_MOVE_STEP = 1;
export const CAR_MOVE_CRITERIA = 4;

/**
 * 사용자가 유효하지 않은 입력을 제공한 경우, 사용하는 에러 메시지
 */
export const INPUT_ERROR_MESSAGE = {
  EMPTY_INPUT: "빈 값으로는 프로그램이 동작할 수 없습니다.",
};

/**
 * GameController 내 Car 전진 조건 관련 상수
 */

export const RANDOM_NUM_LOWER_LIMIT = 0;
export const RANDOM_NUM_UPPER_LIMIT = 9;
/**
 * 게임 내 자동차 전진 조건 충족 여부를 반환한다.
 * @param {number} randomNumber
 * @returns {boolean} 자동차 전진 조건 충족 여부
 */
export const CAN_MOVE = (randomNumber) => {
  return randomNumber >= CAR_MOVE_CRITERIA;
};
