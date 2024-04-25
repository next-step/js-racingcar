import { Name } from './name.js';
import { Position } from './position.js';

export class Car {
  #name;
  #position;

  constructor(name, position = 0) {
    this.#name = new Name(name);
    this.#position = new Position(position);
  }

  move(movable) {
    if (movable()) {
      this.#position.increase();
    }
  }

  get name() {
    return this.#name.value;
  }

  get position() {
    return this.#position.value;
  }
}
