import { NUM } from '../utils/constants.js';
import { isAdvance } from '../utils/validation.js';

class Racing {
  constructor(carNames) {
    this.carNames = [...carNames];

    const racingBoard = {};
    carNames.forEach((carName) => (racingBoard[carName] = 0));
    this.racingBoard = racingBoard;
  }

  getMovement() {
    return (
      Math.floor(Math.random() * (NUM.MAX_VALUE - NUM.MIN_VALUE)) +
      NUM.MIN_VALUE
    );
  }

  runRacingOnce() {
    this.carNames.forEach((carName) => {
      const movement = this.getMovement();

      if (isAdvance(movement)) {
        this.racingBoard[carName] = this.racingBoard[carName] + 1;
      }
    });

    const racingBoard = Object.assign({}, this.racingBoard);
    return racingBoard;
  }

  getWinners() {
    const scores = Array.from(Object.values(this.racingBoard));
    const maxScore = Math.max(...scores);

    const racingBoardEntries = Object.entries(this.racingBoard);
    const winners = [];

    racingBoardEntries.forEach(([key, value]) => {
      const isMax = value === maxScore;
      if (isMax) {
        winners.push(key);
      }
    });

    return winners;
  }
}

export default Racing;
