import { ERROR_MESSAGE } from '../constants/errorMessages.js'
import { Car } from './Car.js'

export class Cars {
  #entries

  constructor(names) {
    this.#validateNames(names)
  }

  #validateNames(names) {
    if (!Array.isArray(names) || !names.length) {
      throw new Error(ERROR_MESSAGE.NAMES_TO_BE_VALID)
    }

    if (this.#hasDuplicateNames(names)) {
      throw new Error('중복된 이름이 있습니다.')
    }

    this.#setEntries(names)
  }

  #hasDuplicateNames(names) {
    return new Set(names).size !== names.length
  }

  #setEntries(names) {
    this.#entries = this.#makeEntries(names)
  }

  #makeEntries(names) {
    return names.map((name) => new Car(name))
  }

  get entries() {
    return this.#entries
  }
}
