import Car from "./Car";

const CAR_ADVANCE_MAX_NUMBER = 9;

const CAR_ADVANCE_THRESHOLD_NUMBER = 4;

const defaultAdvanceCondition = () => {
  return Math.random() * CAR_ADVANCE_MAX_NUMBER >= CAR_ADVANCE_THRESHOLD_NUMBER;
};

export default class Cars {
  cars;
  advanceCondition;

  constructor(advanceCondition = defaultAdvanceCondition) {
    this.cars = [];
    this.advanceCondition = advanceCondition;
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
}
