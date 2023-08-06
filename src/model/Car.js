import { ERROR_MESSAGE } from '../constants/errorMessages'

export class Car {
  static DEFAULT_POSITION = 0
  #name
  #position

  constructor(name) {
    this.#validateName(name)
    this.#name = name
    this.#position = Car.DEFAULT_POSITION
  }

  #validateName(name) {
    if (name.length > 5 || name.length === 0) {
      throw new Error(ERROR_MESSAGE)
    }

    if (!/^[가-힣a-zA-Z]+$/.test(name)) {
      throw new Error(ERROR_MESSAGE.NAME_CHARACTER)
    }

    this.#setName(name)
  }

  #setName(name) {
    this.#name = name
  }

  move(isMove) {
    if (isMove) this.#position += 1
  }

  get name() {
    return this.#name
  }

  get position() {
    return this.#position
  }
}
