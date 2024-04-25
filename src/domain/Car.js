import Name from './Name';

class Car {
  #name;

  constructor(name) {
    this.#name = new Name(name).getName();
  }

  getName() {
    return this.#name;
  }
}

export default Car;
