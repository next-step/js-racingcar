import {
  ERROR_CAR_NAME_TOO_LONG,
  ERROR_CAR_RACE_COUNT_NOT_VALID,
} from "../constants/error.js";
import CarRace from "../domain/CarRace.js";
import Car from "../domain/Car.js";
import { joinCarNamesByComma } from "./cars.js";
import { readLineAsync } from "./readLineAsync.js";

export async function getTotalRaceCountFromUserInput() {
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

export async function getCarNamesFromUserInput() {
  while (true) {
    const input = await readLineAsync(
      "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분)."
    );

    try {
      const carNames = input.split(",");
      carNames.forEach((carName) => {
        Car.validateName(carName);
      });

      return carNames;
    } catch (e) {
      console.log(ERROR_CAR_NAME_TOO_LONG);
      console.log();
    }
  }
}

export function printCarRaceWinners(winners) {
  const joinedCarRaceWinners = joinCarNamesByComma(winners);

  console.log(`${joinedCarRaceWinners}가 최종 우승했습니다.`);
}

export const printCarsStatus = (cars) => {
  cars.forEach((car) => {
    console.log(car.statusToString());
  });
  console.log();
};
