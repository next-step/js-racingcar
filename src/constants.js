export const GAME_MESSAGES = {
  QUESTION:
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  GAME_OVER: "게임이 종료되었습니다.",
};

export const CONDITIONS = {
  can_move_number: 4,
  max_name_length: 5,
  max_round_number: 5,
};

export const ERROR_MESSAGES = Object.freeze({
  OVER_MAXIMUM_NAME_LENGTH: `이름은 ${CONDITIONS.max_name_length}자 이하만 가능합니다.`,
  WHITE_NAME: "이름을 입력해주세요.",
});

export const NAME_SEPARATOR = ",";

export const MOVEMENT_PRINT = "-";

export const INTEGERS_UNDER_TEN = Array(10)
  .fill(0)
  .map((v, i) => v + i);
