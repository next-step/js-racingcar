<<<<<<< HEAD
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

    View.log("\n실행 결과");
    await game.play();
    View.log("경주를 완료했습니다.");
  } catch (error) {
    View.log(error);
  }
}

main();
=======
export class Car {
  #name;

  #xPosition = 0;

  constructor(name) {
    this.#name = name;
  }

<<<<<<<< HEAD:src/domain/Car.js
  get record() {
========
  getCarInfo() {
>>>>>>>> origin2/seung-wan:src/Car.js
    return {
      name: this.#name,
      xPosition: this.#xPosition,
    };
  }

  goForward() {
    this.#go(1);
  }

  #go(amount) {
    this.#xPosition += amount;
  }
}
>>>>>>> origin2/seung-wan
