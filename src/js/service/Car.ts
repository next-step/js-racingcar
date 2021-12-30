import { generateRandomNumber } from '../utils/random';

const SCORING_CRITERIA = 4;

export default class Car {
  carName: string;
  gameResult: number[] = [];

  constructor(carName: string) {
    this.carName = carName;
  }

  playGame(tryAmount: number) {
    this.gameResult = [...Array(tryAmount)].map(() =>
      generateRandomNumber(0, 9) > SCORING_CRITERIA ? 1 : 0
    );
  }

  getScore() {
    return this.gameResult.reduce((cur, prev) => cur + prev);
  }
}
