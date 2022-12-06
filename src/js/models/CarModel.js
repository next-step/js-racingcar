import { MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH } from '../constants.js';

class CarModel {
  name = '';

  constructor() {}

  isValidName(name) {
    return !(name.length < MIN_CAR_NAME_LENGTH || name.length > MAX_CAR_NAME_LENGTH);
  }

  hasSameName(cars, name) {
    return !!cars.find((car) => car.name === name);
  }

  enrollCar(name) {
    this.name = name;
  }
}

export default CarModel;
