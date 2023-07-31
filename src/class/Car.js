export default class Car {
  cars;
  constructor() {
    this.cars = new Map();
  }

  getCarInfo() {
    return new Map(this.cars);
  }

  setCarInfo(cars) {
    this.cars = new Map(cars);
  }
}
