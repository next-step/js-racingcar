import { ERROR_CAR_NAME_TOO_LONG } from "../constants/error.js";
import Car from "../domain/Car.js";
import { readLineAsync } from "./io.js";

export const getCarNamesFromUserInput = async () => {
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
};

export const createCarsFromCarNames = (carNames) => {
  return carNames.map((carName) => new Car(carName));
};

export const printCarsStatus = (cars) => {
  cars.forEach((car) => {
    console.log(car.statusToString());
  });
  console.log();
};

export const joinCarNamesByComma = (cars) => {
  const carNames = cars.map((car) => car.name);
  return carNames.join(", ");
};
