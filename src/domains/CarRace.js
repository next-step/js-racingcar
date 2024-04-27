import { CAR_RACE } from "../constants/carRace";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { Console } from "../utils/console";
import { Car } from "./Car";

export class CarRace {
  #cars;
  #result;
  constructor(carNamesArray) {
    this.#cars = carNamesArray.map((carName) => new Car(carName));
    this.#result = [];
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
  get result() {
    return this.#result;
  }

}
