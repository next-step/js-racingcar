import {
  ERROR_DUPLICATE_CAR_NAME,
  ERROR_INVALID_CAR_NAME,
  RACE_ROUND,
} from "./constants";
import { Car } from "./domain";
import { getRandom, readLineAsync } from "./utils";

export class App {
  static MOVE_MIN = 0;
  static MOVE_MAX = 9;
  static RACE_ROUND = 5;

  constructor() {
    this.cars = [];
    this.winners = [];
  }

  race() {
    console.log("\n실행 결과");
    for (let round = 1; round <= App.RACE_ROUND; round++) {
      this.cars.forEach((car) => {
        car.move(getRandom(App.MOVE_MIN, App.MOVE_MAX));
        console.log(`${car.getName()} : ${"-".repeat(car.getPosition())}`);
      });
      console.log("");
    }

    const maxPosition = Math.max(...this.cars.map((car) => car.getPosition()));
    this.winners = this.cars.filter((car) => car.getPosition() === maxPosition);
    console.log(
      `${this.winners
        .map((car) => car.getName())
        .join(", ")}가 최종 우승했습니다.`
    );
  }

  async play() {
    try {
      const name = await readLineAsync(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
      );

      if (!name) return;

      const carNames = name.split(",").map((name) => name.trim());

      if (carNames.some((name) => name === "")) {
        throw new Error(ERROR_INVALID_CAR_NAME);
      }

      const nameSet = new Set(carNames);
      if (nameSet.size !== carNames.length) {
        throw new Error(ERROR_DUPLICATE_CAR_NAME);
      }

      this.cars = carNames.map((name) => new Car(name));
      this.race();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  getCars() {
    return this.cars;
  }

  getWinners() {
    return this.winners;
  }
}

const app = new App();
app.play();
