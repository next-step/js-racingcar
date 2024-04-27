export const CONSOLE_MESSAGES = {
  START: "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).",
  RACE_RESULT: "실행 결과",
  CAR_POSITION: (car) => `${car.name} : ${"-".repeat(car.position)}`,
  WINNER: (winner) => `${winner}가 최종 우승했습니다.`,
};

export const ERROR_MESSAGES = {
  CAR_NAME_LENGTH: "자동차 이름은 5자 이하만 가능합니다.",
};
