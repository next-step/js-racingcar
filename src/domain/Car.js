import Name from './Name';
import Move from './Move';
import { generateRandomNumber } from '../utils';

class Car extends Move {
  #carName;

  static FORWARD_LIMIT = 4;

  constructor(name) {
    super();
    this.#carName = new Name(name);
  }

  get name() {
    return this.#carName.name;
  }
  forward() {
    if (generateRandomNumber(0, 9) > Car.FORWARD_LIMIT) {
      return super.forward();
    }
    return this;
  }
}

export default Car;
