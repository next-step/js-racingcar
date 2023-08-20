import Car from "./Car";

export default class Cars {
  static ERROR_MESSAGES = Object.freeze({
    DUPLICATE_CAR_NAME: "자동차 이름은 중복될 수 없습니다.",
  });

  #cars = [];

  constructor(names) {
    if (Array.isArray(names)) {
      this.addCars(names);
    }
  }

  get allStatus() {
    return this.#cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  get carNames() {
    return this.#cars.map((car) => car.name);
  }

  #validateCarNames = (newCars) => {
    const carNamesSet = new Set(this.carNames);

    newCars.forEach((newCar) => {
      if (carNamesSet.has(newCar)) {
        throw new Error(Cars.ERROR_MESSAGES.DUPLICATE_CAR_NAME);
      }
    });
  };

  addCar(name) {
    this.#validateCarNames([name]);

    const car = new Car(name);

    this.#cars.push(car);
  }

  addCars(names) {
    this.#validateCarNames(names, this.carNames);

    names.forEach((car) => this.addCar(car));
  }

  advanceCars(callback) {
    this.#cars.forEach((car) => {
      if (callback(car)) {
        car.advance();
      }
    });
  }

  get winners() {
    const maxDistance = Math.max(...this.#cars.map((car) => car.distance));

    return this.#cars
      .filter((car) => car.distance === maxDistance)
      .map((car) => car.name);
  }
}
