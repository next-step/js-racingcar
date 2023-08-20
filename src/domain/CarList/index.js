import Car from '../Car/index.js';

class CarList {
  static ERROR_MESSAGE = {
    NOT_ARRAY_CAR_NAMES: 'carNames가 배열이 아닙니다.',
    NOT_STRING_CAR_NAME: '자동차 이름 중 문자열이 아닌게 있습니다.',
  };

  #cars;

  constructor(carNames) {
    this.validate(carNames);

    this.#cars = carNames.map(Car.of);
  }

  validate(carNames) {
    if (!Array.isArray(carNames)) {
      throw new Error(CarList.ERROR_MESSAGE.NOT_ARRAY_CAR_NAMES);
    }

    if (!carNames.every((carName) => typeof carName === 'string')) {
      throw new Error(CarList.ERROR_MESSAGE.NOT_STRING_CAR_NAME);
    }
  }

  get cars() {
    return this.#cars;
  }

  get carsRecord() {
    return this.#cars.map((car) => car.record);
  }

  get maxDistanceDriven() {
    return Math.max(...this.#cars.map((car) => car.distanceDriven));
  }
}

export default CarList;
