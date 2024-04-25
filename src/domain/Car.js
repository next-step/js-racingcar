import Name from './Name';
import Move from './Move';

class Car extends Move {
  #name;

  constructor(name) {
    super();
    this.#name = new Name(name).getName();
  }

  getName() {
    return this.#name;
  }
}

export default Car;
