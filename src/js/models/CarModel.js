import { CAN_MOVE_NUM, MAX_CAR_NAME_LENGTH, MIN_CAR_NAME_LENGTH } from '../constants.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';

class CarModel {
  name = '';
  moves = [];

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

  setCarMoves(racingCount) {
    const carMoves = Array.from({ length: racingCount })
      .fill(0)
      .map(() => (getRandomNumber() > CAN_MOVE_NUM ? true : false));
    this.moves = carMoves;
  }
}

export default CarModel;
