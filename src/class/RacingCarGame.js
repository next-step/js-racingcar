import * as readline from "readline";

const CAR_NAME_INPUT_GUIDE =
  "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n";

const CAR_NAME_SEPARATOR = ",";

const CAR_NAME_LENGTH = 5;

export const ERROR_MESSAGES = {
  INVALID_EMPTY_NAME: "자동차 이름은 빈값일 수 없습니다.",
  INVALID_NAME_LENGTH: "자동차 이름은 5자를 넘길 수 없습니다.",
  DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
};

const RACING_CAR_ERROR_NAME = "RACING_CAR_ERROR";

class RacingCarGameError extends Error {
  constructor(message) {
    super(message);
    this.name = RACING_CAR_ERROR_NAME;
  }
}

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

        this.settingCars(splitedAnswer);
      } catch (error) {
        if (error instanceof Error && error.name === RACING_CAR_ERROR_NAME) {
          console.log(error.message);
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
        throw new RacingCarGameError(ERROR_MESSAGES.INVALID_EMPTY_NAME);
      }

      if (name.length > CAR_NAME_LENGTH) {
        throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_LENGTH);
      }
    }

    const uniqueCarNames = new Set(names.map((name) => name.trim()));

    if (names.length !== uniqueCarNames.size) {
      throw new RacingCarGameError(ERROR_MESSAGES.DUPLICATE_CAR_NAME);
    }
  }

  settingCars(names) {
    names.forEach((name) => {
      this.cars.set(name, { distance: 0 });
    });
  }
}
