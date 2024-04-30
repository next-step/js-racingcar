import { ERROR_CAR_RACE_COUNT_NOT_VALID } from "../constants/error.js";
import { readLineAsync } from "../utils/io.js";
import { joinCarNamesByComma, printCarsStatus } from "../utils/cars.js";
import { isNumber } from "../utils/number.js";

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
    if (!isNumber(totalRaceCount)) {
      throw new Error(ERROR_CAR_RACE_COUNT_NOT_VALID);
    }

    if (totalRaceCount < 0) {
      throw new Error(ERROR_CAR_RACE_COUNT_NOT_VALID);
    }
  }

  race() {
    while (this.#remainingRaceCount > 0) {
      this.competitors.forEach((competitor) => {
        // 자동차가 움직이는 조건 생성
        const canCarMove = () => {
          const randomValue = Math.floor(Math.random() * 10);
          return randomValue >= 4;
        };

        if (canCarMove()) {
          competitor.move();
        }
      });
      printCarsStatus(this.competitors);

      this.#remainingRaceCount--;
    }
  }

  static async getTotalRaceCountUntilValid() {
    while (true) {
      const input = await readLineAsync("시도할 회수는 몇회인가요?");
      const totalCount = Number(input);

      try {
        CarRace.validateTotalRaceCount(totalCount);
        return totalCount;
      } catch (e) {
        console.log(ERROR_CAR_RACE_COUNT_NOT_VALID);
        console.log();
      }
    }
  }

  printWinners = () => {
    const joinedCarRaceWinners = joinCarNamesByComma(this.winners);

    console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
  };
}

export default CarRace;
