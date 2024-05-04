import { readLineAsync } from "../utils/readLineAsync.js";
import CarRace from "../domain/CarRace.js";
import {
  ERROR_CAR_NAME_TOO_LONG,
  ERROR_CAR_RACE_COUNT_NOT_VALID,
} from "../constants/error.js";
import Car from "../domain/Car.js";

const IO = {
  async getTotalRaceCountFromUserInput() {
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
  },
  async getCarNamesFromUserInput() {
    while (true) {
      const input = await readLineAsync(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
      );

      try {
        const carNames = input.split(",");
        Car.validateCarNames(carNames);

        return carNames;
      } catch (e) {
        console.log(ERROR_CAR_NAME_TOO_LONG);
        console.log();
      }
    }
  },
  printCarRaceWinners(winnerNames) {
    console.log(`${winnerNames}가 최종 우승했습니다.`);
  },
  printCarStatus(carName, carPosition) {
    console.log(`${carName} : ${carPosition}`);
  },
  printCarRaceRoundResult(cars, roundResult) {
    cars.forEach((car, carIndex) => {
      const carPosition = "-".repeat(roundResult.at(carIndex));
      this.printCarStatus(car.name, carPosition);
    });
    console.log();
  },
  printCarRaceRoundsResult(carRace) {
    const cars = carRace.competitors;

    console.log("\n실행 결과");
    carRace.roundResults.forEach((roundResult) => {
      this.printCarRaceRoundResult(cars, roundResult);
    });
  },
};

export default IO;
