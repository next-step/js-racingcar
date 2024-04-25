import { Name } from './name.js';
import { Position } from './position.js';

export class Car {
  #name;
  #position;

  constructor(name, position = 0) {
    this.#name = new Name(name);
    this.#position = new Position(position);
  }

  move(number) {
    if (number >= 4) {
      this.#position = this.#position.increase();
    }
  }
}
