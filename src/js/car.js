import { getRandomInt } from "./util";

export default class Car {
  constructor(name, count) {
    this.name = name;
    this.count = count;
    this.distance = 0;
    this.#runCar();
  }

  #runCar = () => {
    Array.from(Array(this.count)).forEach(() => {
      setTimeout(() => this.#move(), 1000);
    });
  };

  #moveForward = () => {
    this.distance += 1;
  };

  #move = () => {
    const randomNumber = getRandomInt(9);
    if (randomNumber >= 4) {
      this.#moveForward();
    }
  };

  get distance() {
    return this.distance;
  }
}
