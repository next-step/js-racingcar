import * as readline from "readline";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const CAR_NAME_SEPARATOR = ",";

const CAR_NAME_LENGTH = 5;

export const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
};

export default class RacingCarGame {
  constructor() {
    this.cars = new Map();
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_GUIDE, (answer) => {
      const splitedAnswer = answer.split(CAR_NAME_SEPARATOR);

      try {
        this.validateCarName(splitedAnswer);
      } catch (error) {
        if (
          error instanceof Error &&
          error.message === ERROR_MESSAGES.INVALID_EMPTY_NAME
        ) {
          console.log(ERROR_MESSAGES.INVALID_EMPTY_NAME);
        }

        if (
          error instanceof Error &&
          error.message === ERROR_MESSAGES.INVALID_NAME_LENGTH
        ) {
          console.log(ERROR_MESSAGES.INVALID_NAME_LENGTH);
        }
      } finally {
        this.endGame();
      }
    });
  }

  endGame() {
    this.readline.close();
  }

  validateCarName(names) {
    for (const name of names) {
      if (name.trim().length < 1) {
        throw new Error(ERROR_MESSAGES.INVALID_EMPTY_NAME);
      }

      if (name.length > CAR_NAME_LENGTH) {
        throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
      }
    }
  }
}
