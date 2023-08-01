export default class Car {
  cars;
  constructor() {
    this.cars = new Map();
  }

  getCarStatus() {
    return new Map(this.cars);
  }

  setCarStatus(cars) {
    this.cars = new Map(cars);
  }
}
