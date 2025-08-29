import { Car } from "./domain/Car.js";
import { CarValidator } from "./domain/CarValidator.js";

import { View } from "./view/View.js";

import { Game } from "./Game.js";
import { GameValidator } from "./GameValidator.js";

const CAR_NAME_DELIMITER = ",";

async function main() {
  try {
    const carNameInput = await View.read("경주할 자동차 이름을 입력하세요.\n");
    const racingTimesInput = await View.read("시도할 회수는 몇회인가요?\n");

    const carNames = carNameInput.split(CAR_NAME_DELIMITER);
    CarValidator.validateCarNames(carNames);
    const racingTimes = Number(racingTimesInput);
    GameValidator.validateRacingTimes(racingTimes);

    const racingCars = carNames.map((carName) => new Car(carName));

    const game = new Game({
      racingCars,
      racingTimes: racingTimesInput,
    });

    View.log("\n실행 결과");
    const winnerNames = await game.play();
    View.log(`${winnerNames}가 최종 우승했습니다.`);
  } catch (error) {
    View.log(error);
  }
}

main();
