import { CAR_MOVE_CONDITION_BOUNDARY } from "../constants/carRace.js";
import { ERROR_CAR_RACE_COUNT_NOT_VALID } from "../constants/error.js";
import IO from "../view/IO.js";
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

  generateCarMoveCondition() {
    const randomValue = Math.floor(Math.random() * 10);
    return randomValue >= CAR_MOVE_CONDITION_BOUNDARY;
  }

  race() {
    while (this.#remainingRaceCount > 0) {
      this.competitors.forEach((competitor) => {
        const canCarMove = this.generateCarMoveCondition();
        if (canCarMove) {
          competitor.move();
        }
      });
      IO.printCarsStatus(this.competitors);
      this.#remainingRaceCount--;
    }
  }
}

export default CarRace;
