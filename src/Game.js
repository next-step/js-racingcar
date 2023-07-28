import Car from "./Car";
import { getRandomNumber } from "./utils/utils";

export default class Game {
  cars;
  curRound;
  winners;

  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
    this.curRound = 1;
  }

  playGame() {
    while (this.curRound <= 5) {
      this.playRound();
      this.curRound += 1;
    }
  }

  playRound() {
    this.cars.forEach((car) => {
      car.tryMoveWith(getRandomNumber());
    });

    this.setWinners();
  }

  setWinners() {
    const maxPosition = Math.max(...this.cars.map((car) => car.position));
    this.winners = this.cars.filter((car) => car.position === maxPosition);
  }

  getWinners() {
    return this.winners;
  }
}
