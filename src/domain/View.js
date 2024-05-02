import { joinCarNamesByComma, validateCarNames } from "../utils/cars.js";
import { readLineAsync } from "../utils/readLineAsync.js";
import CarRace from "./CarRace.js";
import {
  ERROR_CAR_NAME_TOO_LONG,
  ERROR_CAR_RACE_COUNT_NOT_VALID,
} from "../constants/error.js";

const View = {
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
        validateCarNames(carNames);

        return carNames;
      } catch (e) {
        console.log(ERROR_CAR_NAME_TOO_LONG);
        console.log();
      }
    }
  },
  printCarRaceWinners(winners) {
    const joinedCarRaceWinners = joinCarNamesByComma(winners);

    console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
  },
  printCarStatus(car) {
    const carPosition = "-".repeat(car.position);

    console.log(`${car.name} : ${carPosition}`);
  },
  printCarsStatus(cars) {
    cars.forEach((car) => {
      this.printCarStatus(car);
    });
    console.log();
  },
};

export default View;
