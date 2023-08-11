import Car from "./Car";

export default class Cars {
  #cars = [];
  #DEFAULT_RACING_ROUND_NUMBER = 5;
  #roundNumber = this.#DEFAULT_RACING_ROUND_NUMBER;
  #advanceConditions;

  constructor(advanceConditions) {
    this.#advanceConditions =
      advanceConditions instanceof Array &&
      advanceConditions.every(
        (advanceCondition) => typeof advanceCondition === "function",
      )
        ? advanceConditions
        : [];
  }

  addCar(name) {
    const car = new Car(name);

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
