import { RACE_ROUND } from "./constants";
import { Car } from "./domain";
import { getRandomInRange, readLineAsync } from "./utils";

export class App {
  constructor() {
    this.cars = [];
    this.winners = [];
  }

  async race() {
    console.log("\n실행 결과");
    for (let round = 1; round <= RACE_ROUND; round++) {
      this.cars.forEach((car) => {
        car.move(getRandomInRange());
        console.log(`${car.getName()} : ${"-".repeat(car.getPosition())}`);
      });
      console.log("");
    }

    const maxPosition = Math.max(...this.cars.map((car) => car.getPosition()));
    this.winners = this.cars.filter((car) => car.getPosition() === maxPosition);
    console.log(
      `${this.winners
        .map((car) => car.getName())
        .join(" ")}가 최종 우승했습니다.`
    );
  }

  async play() {
    try {
      const name = await readLineAsync(
        "경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n"
      );
      const carNames = name.split(",").map((name) => name.trim());
      this.cars = carNames.map((name) => new Car(name));
      this.race();
    } catch (error) {
      console.error(error.message);
    }
  }
}

const app = new App();
app.play();
