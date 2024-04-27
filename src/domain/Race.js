import Car from "./Car.js";

export default class Race {
  cars = [];

  constructor(carNames) {
    this.cars = carNames.map((name) => new Car(name));
  }
}
