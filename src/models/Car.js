import { DEFAULT_POSITION } from '../constants'

export class Car {
  #name
  #position

  constructor(name) {
    this.#name = name
    this.#position = DEFAULT_POSITION
  }

  move(score) {
    if (score >= 4) this.#position += 1
  }

  getName() {
    return this.#name
  }

  getPosition() {
    return this.#position
  }
}
