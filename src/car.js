import {
  DEFAULT_STEP_SIZE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  CAR_ERROR_MESSAGE,
  CAR_CONSTRUCTOR_NAME
} from './constants/car'
import { isString, isFunction } from './utils/validator'
import { CustomError } from './utils/customError'

export class Car {
  #name
  #position
  #onRun

  constructor({ name, onRun }) {
    this.#validate(name, onRun)

    this.#name = name
    this.#position = 0
    this.#onRun = onRun
  }

  #validate(name, onRun) {
    this.#validateIsString(name)
    this.#validateMinLength(name)
    this.#validateMaxLength(name)
    this.#validateOnRun(onRun)
  }

  run() {
    this.setPosition(this.getPosition() + DEFAULT_STEP_SIZE)
    this.#onRun?.(this)
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
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      })
    }
  }

  #validateMinLength(name) {
    if (name.length < MIN_NAME_LENGTH) {
      throw new CustomError({
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(MIN_NAME_LENGTH)
      })
    }
  }

  #validateMaxLength(name) {
    if (name.length > MAX_NAME_LENGTH) {
      throw new CustomError({
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH)
      })
    }
  }

  #validateOnRun(onRun) {
    if (onRun && !isFunction(onRun)) {
      throw new CustomError({
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_ON_RUN_TYPE
      })
    }
  }
}
