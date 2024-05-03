import { CAR_RACE } from "./carRace";

export const CONSOLE_MESSAGES = {
  START: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).",
  TRY_COUNT: "시도할 회수는 몇회인가요?",
  RACE_RESULT: "실행 결과",
  CAR_POSITION: (name, position) =>
    `${name} : ${CAR_RACE.POSITION_SYMBOL.repeat(position)}`,
  WINNER: winner => `${winner}가 최종 우승했습니다.`,
};

export const ERROR_MESSAGES = {
  CAR_MAX_NAME_LENGTH: "자동차 이름은 5자 이하만 가능합니다.",
  CAR_MIN_NAME_LENGTH: "자동차 이름은 1자 이상만 가능합니다.",
  CAR_NAME_LENGTH: "자동차 이름은 1자 이상 5자 이하만 가능합니다.",
  SAME_CAR_NAME: "중복된 자동차 이름이 존재합니다.",
  TRY_COUNT_MIN: "시도 횟수는 1 이상이어야 합니다.",
  TRY_COUNT_NUMBER: "시도 횟수는 정수여야 합니다.",
};
