import { ERROR_MESSAGE } from '../constants/errorMessages.js'
import { Car } from './Car.js'

export class Cars {
  #entries
  #status

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

  move(moveCondition) {
    this.#entries.forEach((car) => {
      const shouldMove = moveCondition()
      car.move(shouldMove)
    })
  }

  get entries() {
    return this.#entries
  }

  #setStatus() {
    this.#status = this.#entries.map((car) => ({
      name: car.name,
      position: car.position,
    }))
  }

  get status() {
    this.#setStatus()

    return this.#status
  }
}
