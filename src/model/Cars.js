import { ERROR_MESSAGE } from '../constants/errorMessages.js'
import { Car } from './Car.js'

export class Cars {
  #carNames
  #entries
  #status

  constructor(names) {
    this.#setCarNames(names)
    this.#validateCarNames(this.#carNames)
    this.#setEntries(this.#carNames)
  }

  move(moveCondition) {
    this.#entries.forEach((car) => {
      const moving = moveCondition()
      car.move(moving)
    })
  }

  #setCarNames(names) {
    if (Array.isArray(names)) {
      this.#carNames = names
      return
    }

    this.#carNames = names.split(',')
  }

  #validateCarNames(carNames) {
    if (
      !Array.isArray(carNames) ||
      !carNames.length ||
      carNames.some((car) => !car || typeof car !== 'string')
    ) {
      throw new Error(ERROR_MESSAGE.NAMES_TO_BE_VALID)
    }

    if (this.#hasDuplicatedNames(carNames)) {
      throw new Error(ERROR_MESSAGE.HAS_DUPLICATED_NAMES)
    }
  }

  #hasDuplicatedNames(names) {
    return new Set(names).size !== names.length
  }

  #setEntries(names) {
    let entries = names
    if (typeof names === 'string') {
      entries = names.split(',')
    }

    this.#entries = entries.map((name) => new Car(name))
  }

  #setStatus() {
    this.#status = this.#entries.map((car) => ({
      name: car.name,
      position: car.position,
    }))
  }

  get entries() {
    return this.#entries
  }

  get status() {
    this.#setStatus()

    return this.#status
  }
}
