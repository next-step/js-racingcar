import Car from "./Car";

const CAR_ADVANCE_MAX_NUMBER = 9;

const CAR_ADVANCE_THRESHOLD_NUMBER = 4;

const DEFAULT_RACING_ROUND_NUMBER = 5;

const defaultAdvanceCondition = () => {
  return Math.random() * CAR_ADVANCE_MAX_NUMBER >= CAR_ADVANCE_THRESHOLD_NUMBER;
};

export default class Cars {
  cars;
  advanceCondition;
  roundNumber;

  constructor(advanceCondition = defaultAdvanceCondition) {
    this.cars = [];
    this.advanceCondition = advanceCondition;
    this.roundNumber = DEFAULT_RACING_ROUND_NUMBER;
  }

  addCar(name) {
    const car = new Car(name, this.advanceCondition);

    this.cars.push(car);
  }

  getAllCarStatus() {
    return this.cars.map((car) => ({
      name: car.getName(),
      distance: car.getDistance(),
    }));
  }

  executeOneRound() {
    this.cars.forEach((car) => car.advance());
  }

  executeMultipleRounds(afterRoundAction) {
    Array.from({ length: this.roundNumber }, () => {
      this.executeOneRound();

      afterRoundAction(this.getAllCarStatus());
    });
  }

  getWinners() {
    const maxDistance = Math.max(...this.cars.map((car) => car.getDistance()));

    return this.cars
      .filter((car) => car.getDistance() === maxDistance)
      .map((car) => car.getName());
  }

  setRoundNumber(number) {
    this.roundNumber = number;
  }
}
