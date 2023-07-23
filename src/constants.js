export const ERROR_MESSAGES = {
  OVER_MAXIMUM_NAME_LENGTH: "이름은 5자 이하만 가능합니다.",
  WINNERS_TYPE_IS_NOT_ARRAY: "winners type is not Array",
};

export const GAME_MESSAGES = {
  QUESTION:
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  GAME_OVER: "게임이 종료되었습니다.",
};

export const INTEGERS_UNDER_TEN = Array(10)
  .fill(0)
  .map((v, i) => v + i);
