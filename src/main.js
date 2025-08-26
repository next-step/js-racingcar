import { Car } from "./domain/Car.js";
import { CarValidator } from "./domain/CarValidator.js";
import { Game } from "./Game.js";
import { View } from "./view/View.js";

const CAR_NAME_DELIMITER = ",";

async function main() {
  try {
    const input = await View.read("경주할 자동차 이름을 입력하세요.\n");
    const carNames = input.split(CAR_NAME_DELIMITER);

    CarValidator.validateCarNames(carNames);

    const racingCars = carNames.map((carName) => new Car(carName));

    const game = new Game({
      racingCars,
    });

    console.log("\n실행 결과");
    await game.play();
    console.log("경주를 완료했습니다.");
  } catch (error) {
    console.error(error);
  }
}

main();
