import {
  CAR_NAME_INPUT_GUIDE,
  CAR_NAME_MAX_LENGTH,
  CAR_NAME_SEPARATOR,
  CAR_RACE_TITLE,
  RACING_CAR_ERROR_NAME,
  ERROR_MESSAGES,
  RACING_SCORE_CHAR,
  RACING_ROUNDS,
  CAR_NAME_MIN_LENGTH,
  NO_WINNER_MESSAGE,
  WINNER_ANNOUNCEMENT_MESSAGE,
} from "../data/constants";

// class RacingCarGameError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = RACING_CAR_ERROR_NAME;
//   }
// }

export const DEFAULT_RACING_ROUND_NUMBER = 5;

export default class RacingCarGame {
  cars;
  roundNumbers;
  onGameStart;
  onMultipleRoundStart;
  onSingleRoundStart;
  onSingleRoundEnd;
  onMultipleRoundEnd;
  onGameEnd;
  checkForAdvance;
  validateCarNames;
  onError;

  constructor({
    roundNumbers = DEFAULT_RACING_ROUND_NUMBER,
    onGameStart,
    onMultipleRoundStart,
    onSingleRoundStart,
    onSingleRoundEnd,
    onMultipleRoundEnd,
    onGameEnd,
    checkForAdvance,
    validateCarNames,
    onError,
  }) {
    this.cars = new Map();
    this.racingRounds = roundNumbers;
    this.onGameStart = onGameStart;
    this.onGameEnd = onGameEnd;
    this.onError = onError;
    this.onMultipleRoundEnd = onMultipleRoundEnd;
    this.onMultipleRoundStart = onMultipleRoundStart;
    this.onSingleRoundStart = onSingleRoundStart;
    this.onSingleRoundEnd = onSingleRoundEnd;
    this.checkForAdvance = checkForAdvance;
    this.validateCarNames = validateCarNames;
  }

  startGame() {
    try {
      const enteredCarNames = this.onGameStart();

      this.validateCarNames(enteredCarNames);

      this.settingCars(enteredCarNames);

      this.executeMultipleRounds();

      this.endGame();
    } catch (error) {
      this.onError(error);
    }
  }

  endGame() {
    this.onGameEnd(this.cars);
  }

  // validateCarName(names) {
  //   for (const name of names) {
  //     if (name.trim().length < CAR_NAME_MIN_LENGTH) {
  //       throw new RacingCarGameError(ERROR_MESSAGES.INVALID_EMPTY_NAME);
  //     }

  //     if (name.length > CAR_NAME_MAX_LENGTH) {
  //       throw new RacingCarGameError(ERROR_MESSAGES.INVALID_NAME_LENGTH);
  //     }
  //   }

  //   const uniqueCarNames = new Set(names.map((name) => name.trim()));

  //   if (names.length !== uniqueCarNames.size) {
  //     throw new RacingCarGameError(ERROR_MESSAGES.DUPLICATE_CAR_NAME);
  //   }
  // }

  settingCars(names) {
    names.forEach((name, index) => {
      this.cars.set(`${name}-${index}`, { distance: 0, name });
    });
  }

  // displayRacingTitle() {
  //   console.log("");
  //   console.log(CAR_RACE_TITLE);
  // }

  executeOneRound() {
    this.cars.forEach((carInfo, carName) => {
      if (this.checkForAdvance()) {
        carInfo.distance += 1;
        this.cars.set(carName, carInfo);
      }
    });

    // this.displayRacingBoard();
  }

  // checkForAdvance() {
  //   return Math.random() * 9 >= 4;
  // }

  // displayRacingBoard() {
  //   this.cars.forEach((carInfo, carName) => {
  //     console.log(`${carName} : ${RACING_SCORE_CHAR.repeat(carInfo.distance)}`);
  //   });
  //   console.log("");
  // }

  executeMultipleRounds() {
    Array.from({ length: this.racingRounds }, () => this.executeOneRound());
  }

  // getWinners() {
  //   const distanceArray = [...this.cars.values()].map((el) => el.distance);
  //   const maxDistance = Math.max(...distanceArray);

  //   if (maxDistance === 0) {
  //     return [];
  //   }

  //   return [...this.cars.keys()].filter(
  //     (car) => this.cars.get(car).distance === maxDistance
  //   );
  // }

  // displayWinners() {
  //   const winners = this.getWinners();

  //   if (winners.length < 1) {
  //     console.log(NO_WINNER_MESSAGE);
  //   } else {
  //     console.log(
  //       `${winners.join(CAR_NAME_SEPARATOR)}${WINNER_ANNOUNCEMENT_MESSAGE}`
  //     );
  //   }
  // }
}
