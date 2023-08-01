import {
  DEFAULT_STEP_SIZE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH
} from './constants/car'
import { CAR_ERROR_MESSAGE } from './constants/error'
import { isString } from './utils/validator'

export class Car {
  #name
  #position

  constructor(name) {
    this.#validate(name)

    this.#name = name
    this.#position = 0
  }

  #validate(name) {
    if (!isString(name)) {
      throw new Error(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE)
    }

    if (name.length < MIN_NAME_LENGTH) {
      throw new Error(CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(MIN_NAME_LENGTH))
    }

    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH))
    }
  }

  run() {
    this.setPosition(this.getPosition() + DEFAULT_STEP_SIZE)
    this.printCarName()
  }

  printCarName() {
    const position = '-'.repeat(this.getPosition())

    console.log(`${this.getName()}: ${position}`)
  }

  setPosition(newPosition) {
    this.#position = newPosition
  }

  getName() {
    return this.#name
  }

  getPosition() {
    return this.#position
  }
}
