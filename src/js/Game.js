import { Car } from './Car.js';

export default class Game {
  static #cars;

  static readyCars(carNameList) {
    Game.#cars = carNameList.map(
      (carName, index) => new Car({ name: carName, line: `car-line-${index}` })
    );
  }

  static end() {
    Game.#cars = null;
  }

  static get cars() {
    return Game.#cars;
  }

  static get winner() {
    Game.#cars.sort(
      (prevCar, nextCar) => nextCar.movingDistance - prevCar.movingDistance
    );
    const [firstRankCar] = Game.#cars;
    return Game.#cars
      .filter((car) => car.movingDistance >= firstRankCar.movingDistance)
      .map((car) => car.name)
      .join(',');
  }
}
