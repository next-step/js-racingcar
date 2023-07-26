const DEFAULT_POSISION = 0
export default class Car {
  #name
  #position

  constructor(name) {
    this.#name = name
    this.#position = DEFAULT_POSISION
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
