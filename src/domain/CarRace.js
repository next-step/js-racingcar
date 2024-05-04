import { CAR_MOVE_CONDITION_BOUNDARY } from "../constants/carRace.js";
import { ERROR_CAR_RACE_COUNT_NOT_VALID } from "../constants/error.js";
class CarRace {
  #remainingRoundsCount;
  #roundResults = [];

  constructor(competitors, totalRaceCount = 0) {
    CarRace.validateTotalRaceCount(totalRaceCount);

    this.competitors = competitors;
    this.#remainingRoundsCount = totalRaceCount;
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

  get remainingRoundsCount() {
    return this.#remainingRoundsCount;
  }

  get winnerPosition() {
    const positionResults = this.competitors.map(
      (competitor) => competitor.position
    );

    return Math.max(...positionResults);
  }

  get roundResults() {
    return this.#roundResults;
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

  startRound() {
    this.competitors.forEach((competitor) => {
      const canCarMove = this.generateCarMoveCondition();
      if (canCarMove) {
        competitor.move();
      }
    });
    this.saveRoundResult();
  }

  saveRoundResult() {
    const roundResult = this.competitors.map(
      (competitor) => competitor.position
    );
    this.#roundResults.push(roundResult);
  }

  race() {
    while (this.#remainingRoundsCount > 0) {
      this.startRound();
      this.#remainingRoundsCount--;
    }
  }
}

export default CarRace;
