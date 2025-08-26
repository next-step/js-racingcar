import { Car } from "./domain/Car.js";
import { Validator } from "./Validator.js";
import { View } from "./view/View.js";

const CAR_NAME_DELIMITER = ",";

async function main() {
  try {
    const input = await View.read("경주할 자동차 이름을 입력하세요.\n");
    const carNames = input.split(CAR_NAME_DELIMITER);

    Validator.validateCarNames(carNames);

    const carList = carNames.map((carName) => new Car(carName));

    console.log("\n실행 결과");
    await Promise.all(carList.map((it) => it.play()));
    console.log("경주를 완료했습니다.");
  } catch (error) {
    console.error(error);
  }
}

main();
