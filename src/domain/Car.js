export class Car {
  #name;

  #xPosition = 0;

  constructor(name) {
    this.#name = name;
  }

<<<<<<<< HEAD:src/domain/Car.js
  get record() {
========
  getCarInfo() {
>>>>>>>> origin2/seung-wan:src/Car.js
    return {
      name: this.#name,
      xPosition: this.#xPosition,
    };
  }

  goForward() {
    this.#go(1);
  }

  #go(amount) {
    this.#xPosition += amount;
  }
}
