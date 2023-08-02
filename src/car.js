import {
  DEFAULT_STEP_SIZE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  CAR_ERROR_MESSAGE
} from './constants/car'
import { isString } from './utils/validator'
import { CustomError } from './utils/customError'

export class Car {
  #name
  #position

  constructor(name) {
    this.#validate(name)

    this.#name = name
    this.#position = 0
  }

  #validate(name) {
    this.#validateIsString(name)
    this.#validateMinLength(name)
    this.#validateMaxLength(name)
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

  #validateIsString(name) {
    if (!isString(name)) {
      throw new CustomError({
        cause: this,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      })
    }
  }

  #validateMinLength(name) {
    if (name.length < MIN_NAME_LENGTH) {
      throw new CustomError({
        cause: this,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(MIN_NAME_LENGTH)
      })
    }
  }

  #validateMaxLength(name) {
    if (name.length > MAX_NAME_LENGTH) {
      throw new CustomError({
        cause: this,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH)
      })
    }
  }
}
