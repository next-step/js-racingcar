import * as readline from "readline";
import RacingCarGame from "./class/RacingCarGame";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const CAR_NAME_SEPARATOR = ",";

const CAR_NAME_MAX_LENGTH = 5;
const CAR_NAME_MIN_LENGTH = 1;

const CAR_RACE_TITLE = "실행 결과";

const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
  DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
};

const RACING_CAR_ERROR_NAME = "RACING_CAR_ERROR";

const RACING_SCORE_CHAR = "-";

const RACING_ROUNDS = 5;

const WINNER_ANNOUNCEMENT_MESSAGE = "가 최종 우승했습니다.";

class RacingCarGameError extends Error {
  constructor(message) {
    super(message);
    this.name = RACING_CAR_ERROR_NAME;
  }
}

const racingCarGameReadline = readline.createInterface({
  input: process.stdin,
  output: process.stdin,
});

const handleGameStart = () => {
  return new Promise((resolve) => {
    racingCarGameReadline.question(CAR_NAME_INPUT_GUIDE, (answer) => {
      resolve(answer.split(CAR_NAME_SEPARATOR));
    });
  });
};

const handleGameEnd = () => {
  racingCarGameReadline.close();
};

const racingCarGame = new RacingCarGame({
  roundNumbers: RACING_ROUNDS,
  onGameStart: handleGameStart,
  onGameEnd: handleGameEnd,
});

racingCarGame.startGame();
