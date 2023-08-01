export const CONDITIONS = {
  can_move_number: 4,
  max_car_name_length: 5,
  max_game_round_number: 5,
  min_game_participants_number: 2,
};

export const NAME_SEPARATOR = ",";

export const MOVEMENT_PRINT = "-";

export const INTERVAL_ROUND_TIME = 1_000;

export const GAME_MESSAGES = {
  QUESTION:
    "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n",
  GAME_START: "\n실행결과",
  GAME_OVER: "게임이 종료되었습니다.",
};

export const ERROR_MESSAGES = {
  OVER_MAXIMUM_CAR_NAME_LENGTH: `이름은 ${CONDITIONS.max_car_name_length}자 이하만 가능합니다.`,
  WHITE_CAR_NAME: "이름을 입력해주세요.",
  INVALID_PARTICIPANTS_TYPE: "참여자는 자동차만 등록할 수 있습니다.",
  INVALID_PARTICIPANTS_LENGTH: `게임에는 ${CONDITIONS.min_game_participants_number}명 이상만 참여할 수 있습니다.`,
  DUPLICATED_PARTICIPANTS_NAME: "중복된 이름으로는 게임에 참여할 수 없습니다.",
};
