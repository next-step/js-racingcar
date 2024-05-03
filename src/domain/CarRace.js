import { ERROR_CAR_RACE_COUNT_NOT_VALID } from "../constants/error.js";
import View from "./View.js";
class CarRace {
  #remainingRaceCount;

  constructor(competitors, totalRaceCount = 0) {
    CarRace.validateTotalRaceCount(totalRaceCount);

    this.competitors = competitors;
    this.#remainingRaceCount = totalRaceCount;
  }

  get winners() {
    const winners = this.competitors.filter(
      (competitor) => competitor.position === this.winnerPosition
    );

    return winners;
  }

  get winnerNames() {
    return this.winners.map((winner) => winner.name);
  }

  get remainingRaceCount() {
    return this.#remainingRaceCount;
  }

  get winnerPosition() {
    const positionResults = this.competitors.map(
      (competitor) => competitor.position
    );

    return Math.max(...positionResults);
  }

  static validateTotalRaceCount(totalRaceCount) {
    if (!Number.isInteger(totalRaceCount)) {
      throw new Error(ERROR_CAR_RACE_COUNT_NOT_VALID);
    }

    if (totalRaceCount < 0) {
      throw new Error(ERROR_CAR_RACE_COUNT_NOT_VALID);
    }
  }

  static generateCarMoveCondition() {
    const randomValue = Math.floor(Math.random() * 10);
    return randomValue >= 4;
  }

  race() {
    while (this.#remainingRaceCount > 0) {
      this.competitors.forEach((competitor) => {
        const canCarMove = CarRace.generateCarMoveCondition();
        if (canCarMove) {
          competitor.move();
        }
      });
      View.printCarsStatus(this.competitors);
      this.#remainingRaceCount--;
    }
  }
}

export default CarRace;
