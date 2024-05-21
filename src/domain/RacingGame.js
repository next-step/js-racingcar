import Car from "./Car.js";

class RacingGame {
  #racingTry;

  constructor(racingTry) {
    this.#racingTry = racingTry;
  }

  createRacingCars(name) {
    return name.split(",").map((name) => new Car(name.trim()));
  }

  getWinners(cars = []) {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    const maxPositionCars = cars.filter((car) => car.position === maxPosition);

    return maxPositionCars; // car 객체
  }

  get racingTry() {
    return this.#racingTry;
  }
}

export default RacingGame;
