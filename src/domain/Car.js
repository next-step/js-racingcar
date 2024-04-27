import Name from './Name';
import Move from './Move';
import { generateRandomNumber } from '../utils';

class Car extends Move {
  #name;

  constructor(name) {
    super();
    this.#name = new Name(name).getName();
  }

  getName() {
    return this.#name;
  }

  forward() {
    if (generateRandomNumber(0, 9) > 4) {
      return super.forward();
    }
    return this;
  }
}

export default Car;
