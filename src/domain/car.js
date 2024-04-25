import { Name } from './name.js';
import { Position } from './position.js';

export class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = new Name(name);
    this.#position = new Position();
  }

}
