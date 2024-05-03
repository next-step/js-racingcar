export const CAR = {
  MAX_NAME_LENGTH: 5,
  MIN_RANDOM_NUMBER: 0,
  MAX_RANDOM_NUMBER: 9,
  MIN_MOVE_THRESHOLD: 4,
  NAME_SEPARATOR: ",",
  POSITION_MARK: "-",
};

export const RACE = {
  MIN_ROUND: 1,
  MAX_ROUND: 5,
};

export const MESSAGE = {
  ASK_CAR_NAMES:
    "경주할 자동차 이름을 입력하세요. (이름은 쉼표(,) 기준으로 구분)",
  ASK_MAX_ROUND: "시도할 횟수는 몇회인가요?",
  RESULT: "실행 결과",
  WINNER: "가 최종 우승했습니다.",
};

export const ERROR_MESSAGE = {
  CAR_NAME_REQUIRED: "자동차 이름을 입력해주세요.",
  CAR_NAME_LENGTH: "자동차 이름은 5자 이하만 가능합니다.",
  RACE_ROUND_REQUIRED: "시도할 횟수를 입력해주세요.",
  RACE_ROUND_NUMBER: "시도할 횟수는 숫자여야합니다.",
  RACE_ROUND_NATURAL_NUMBER: "시도할 횟수는 자연수여야합니다.",
  RACE_ROUND_MORE_THAN_ZERO: "시도할 횟수는 0보다 커야합니다.",
  PLAY_ERROR: "에러가 발생하여 프로그램을 종료합니다.",
};
