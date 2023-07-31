// GameController 객체 관련 setting 상수
export const TOTAL_GAME_ROUNDS = 5;
export const RANDOM_NUM_LOWER_LIMIT = 0;
export const RANDOM_NUM_UPPER_LIMIT = 9;
export const CAR_MOVE_STEP = 1;
export const CAR_MOVE_CRITERIA = 4;
export const CAN_MOVE = (randomNumber) => {
  return randomNumber >= CAR_MOVE_CRITERIA;
};

export const GAME_INIT_ROUND = 1;
export const INPUT_ERROR_MESSAGE = {
  EMPTY_INPUT: "빈 값으로는 프로그램이 동작할 수 없습니다.",
};
