import { ERROR_MESSAGE } from '../constants/errorMessages.js'

export class Car {
  static DEFAULT_POSITION = 0
  static VALID_NAME_MAX_LENGTH = 5
  static VALID_NAME_MIN_LENGTH = 0
  #name
  #position

  constructor(name) {
    this.#validateName(name)
    this.#name = name
    this.#position = Car.DEFAULT_POSITION
  }

  #validateName(name) {
    if (
      name.length > Car.VALID_NAME_MAX_LENGTH ||
      name.length === Car.VALID_NAME_MIN_LENGTH
    ) {
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

  move(moving) {
    if (moving) this.#position += 1
  }

  get name() {
    return this.#name
  }

  get position() {
    return this.#position
  }
}
