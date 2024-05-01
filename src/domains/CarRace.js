import { CAR_RACE } from "../constants/carRace";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { Car } from "./Car";

export class CarRace {
  #cars;
  #result;
  constructor(carNamesArray) {
    this.#cars = carNamesArray;
    this.#result = [];
  }

  get result() {
    return this.#result;
  }

  moveCar(carName, randomNumber) {
    const targetCar = this.#cars.find(car => car.name === carName);
    if (randomNumber >= CAR_RACE.MOVE_THRESHOLD) {
      targetCar.move();
    }
  }

  #gameRound() {
    this.#cars.map(car => {
      const randomDigitFrom0to9 = generateRandomNumber(
        CAR_RACE.MIN_RANDOM_NUMBER,
        CAR_RACE.MAX_RANDOM_NUMBER,
      );
      this.moveCar(car.name, randomDigitFrom0to9);
    });
  }

  #setCurrentRoundResult() {
    const currentRoundResult = this.#cars.map(car => ({
      name: car.name,
      position: car.position,
    }));
    this.#result.push(currentRoundResult);
  }

  totalRound() {
    for (let i = 0; i < CAR_RACE.TOTAL_ROUND; i++) {
      this.#gameRound();
      this.#setCurrentRoundResult();
    }
  }

  #getMaxPosition() {
    return Math.max(...this.#cars.map(car => car.position));
  }

  getWinner() {
    const maxPosition = this.#getMaxPosition();
    return this.#cars.filter(car => car.position === maxPosition);
  }
}
