import * as readline from "readline";
import {
  CAR_NAME_INPUT_GUIDE,
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_SEPARATOR,
  CAR_RACE_TITLE,
  RACING_CAR_ERROR_NAME,
  ERROR_MESSAGES,
  RACING_SCORE_CHAR,
  RACING_ROUNDS,
} from "../data/constants";

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
    this.racingRounds = RACING_ROUNDS;
  }

  startGame() {
    this.readline.question(CAR_NAME_INPUT_GUIDE, (answer) => {
      const splitedAnswer = answer.split(CAR_NAME_SEPARATOR);

      try {
        this.validateCarName(splitedAnswer);

        this.settingCars(splitedAnswer);

        this.displayRacingTitle();

        this.executeMultipleRounds();
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

      if (name.length > CAR_NAME_MAX_LENGTH) {
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

  displayRacingTitle() {
    console.log("");
    console.log(CAR_RACE_TITLE);
  }

  executeOneRound() {
    this.cars.forEach((carInfo, carName) => {
      if (this.checkForAdvance()) {
        carInfo.distance += 1;
        this.cars.set(carName, carInfo);
      }
    });

    this.displayRacingBoard();
  }

  checkForAdvance() {
    return Math.random() * 9 >= 4;
  }

  displayRacingBoard() {
    this.cars.forEach((carInfo, carName) => {
      console.log(`${carName} : ${RACING_SCORE_CHAR.repeat(carInfo.distance)}`);
    });
    console.log("");
  }

  executeMultipleRounds() {
    Array.from({ length: this.racingRounds }, () => this.executeOneRound());
  }
}
