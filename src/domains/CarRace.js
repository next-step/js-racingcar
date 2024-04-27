import { CAR_RACE } from "../constants/carRace";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { Car } from "./Car";

export class CarRace {
  #cars;
  #result;
  constructor(carNamesArray) {
    this.#cars = this.#makeCarInstance(carNamesArray);
    this.#result = [];
  }

  get cars() {
    return this.#cars;
  }

  get result() {
    return this.#result;
  }

  #makeCarInstance(carNamesArray) {
    return carNamesArray.map((carName) => new Car(carName));
  }

  #moveCar(Car) {
    if (
      generateRandomNumber(
        CAR_RACE.MIN_RANDOM_NUMBER,
        CAR_RACE.MAX_RANDOM_NUMBER
      ) >= CAR_RACE.MOVE_THRESHOLD
    ) {
      Car.move();
    }
  }

  #gameRound() {
    this.#cars.map((car) => {
      this.#moveCar(car);
    });
  }

  #setCurrentRountResult() {
    const currentRoundResult = this.#cars.map((car) => ({
      name: car.name,
      position: car.position,
    }));
    this.#result.push(currentRoundResult);
  }

  totalRound() {
    for (let i = 0; i < CAR_RACE.TOTAL_ROUND; i++) {
      this.#gameRound();
      this.#setCurrentRountResult();
    }
  }

  #getMaxPosition() {
    return Math.max(...this.#cars.map((car) => car.position));
  }

  getWinner() {
    const maxPosition = this.#getMaxPosition();
    return this.#cars.filter((car) => car.position === maxPosition);
  }
}
