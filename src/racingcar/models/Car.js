import { getRandomNumber } from '../../utils/randoms';
import {
  GO_FLAG_NUMBER,
  MAX_RANDOM_NUMBER,
  MIN_RANDOM_NUMBER,
} from '../constatns/values';
export default class Car {
  #name;
  #moved;

  constructor(name) {
    this.#name = name;
    this.#moved = 0;
  }

  get moved() {
    return this.#moved;
  }

  get name() {
    return this.#name;
  }

  move() {
    if (getRandomNumber(MIN_RANDOM_NUMBER, MAX_RANDOM_NUMBER) >= GO_FLAG_NUMBER)
      this.#moved++;
  }
}
