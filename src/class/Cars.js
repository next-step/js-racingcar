import Car from "./Car";

const DEFAULT_RACING_ROUND_NUMBER = 5;

export default class Cars {
  #cars;
  #roundNumber;
  #advanceConditions;

  constructor(advanceConditions) {
    this.#cars = [];
    this.#roundNumber = DEFAULT_RACING_ROUND_NUMBER;
    this.#advanceConditions =
      advanceConditions instanceof Array &&
      advanceConditions.every(
        (advanceCondition) => typeof advanceCondition === "function",
      )
        ? advanceConditions
        : [];
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

  executeOneRound(advanceCondition) {
    this.#cars.forEach((car) => car.advance(advanceCondition));
  }

  executeMultipleRounds(afterRoundAction) {
    Array.from({ length: this.#roundNumber }, (_, index) => {
      this.executeOneRound(this.#advanceConditions[index]);

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
