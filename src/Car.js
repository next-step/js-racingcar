class Car {
  #name;
  #position;

  constructor() {
    this.#name = "";
    this.#position = 0;
  }

  changeName(name) {
    this.#name = name;
  }

  move() {
    this.#position++;
  }

  getName() {
    return this.#name;
  }

  getCurrentPosition() {
    return this.#position;
  }
}

export default Car;
