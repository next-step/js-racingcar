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
    let maxPosition = Math.max(...cars.map((car) => car.getPosition()));
    let maxPositionCars = cars.filter(
      (car) => car.getPosition() === maxPosition
    );

    return maxPositionCars; // car 객체
  }

  getRacingTry() {
    return this.#racingTry;
  }
}

export default RacingGame;
