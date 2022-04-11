import { getRandomInt } from "./util.js";

export default class Car {
  constructor(name, count) {
    this.name = name;
    this.count = count;
    this.distance = 0;
    this.isGoing = false;
    this.#runCar();
  }

  #runCar = () => {
    let counter = 1;

    const timeout = setInterval(() => {
      this.#move();
      if (counter++ == this.count) {
        clearInterval(timeout);
      }
    }, 1000);
  };

  #moveForward = () => {
    this.distance += 1;
    this.isGoing = true;
  };

  #move = () => {
    const randomNumber = getRandomInt(9);
    if (randomNumber >= 4) {
      this.#moveForward();
    } else {
      this.isGoing = false;
    }
  };
}
