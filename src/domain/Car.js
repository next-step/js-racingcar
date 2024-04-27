import Name from './Name';
import Move from './Move';
import { generateRandomNumber } from '../utils';

class Car extends Move {
  #carName;

  static FORWARD_LIMIT = 4;
  static DEFAULT_MOVE_SIZE = 1;

  constructor(carName) {
    super();
    this.#carName = new Name(carName).name;
  }

  get carName() {
    return this.#carName;
  }

  forward(moveSize = Car.DEFAULT_MOVE_SIZE) {
    if (generateRandomNumber(0, 9) > Car.FORWARD_LIMIT) {
      return super.forward(moveSize);
    }
    return this;
  }
}

export default Car;
