class Car {
  #name;

  #position = 0;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get position() {
    return this.#position;
  }

  move() {
    if (Car.getRandomNumber() >= 4) this.#position += 1;
  }

  static getRandomNumber() {
    return Math.floor(Math.random() * 10);
  }
}

export default Car;
