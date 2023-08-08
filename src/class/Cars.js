import Car from "./Car";

const DEFAULT_RACING_ROUND_NUMBER = 5;

export default class Cars {
  #cars;
  #roundNumber;

  constructor() {
    this.#cars = [];
    this.#roundNumber = DEFAULT_RACING_ROUND_NUMBER;
  }

  addCar(name, advanceCondition) {
    const car = new Car(name, advanceCondition);

    this.#cars.push(car);
  }

  getAllCarStatus() {
    return this.#cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  executeOneRound() {
    this.#cars.forEach((car) => car.advance());
  }

  executeMultipleRounds(afterRoundAction) {
    Array.from({ length: this.#roundNumber }, () => {
      this.executeOneRound();

      afterRoundAction(this.getAllCarStatus());
    });
  }

  getWinners() {
    const maxDistance = Math.max(...this.#cars.map((car) => car.distance));

    return this.#cars
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.name);
  }

  setRoundNumber(number) {
    this.#roundNumber = number;
  }
}
