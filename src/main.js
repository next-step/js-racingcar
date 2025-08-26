import { Car } from "./domain/Car.js";
import { Validator } from "./Validator.js";
import { View } from "./view/View.js";

const CAR_NAME_DELIMITER = ",";

async function main() {
  try {
    const name = await View.read("경주할 자동차 이름을 입력하세요.");
    const carNames = name.split(CAR_NAME_DELIMITER);

    Validator.validateCarNames(carNames);

    const car = new Car(name);

    // car.play();
  } catch (error) {
    console.error(error);
  }
}

main();
