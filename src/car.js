import {
  ERROR_MESSAGE,
  DEFAULT_STEP_SIZE,
  RUN_THRESHOLDS,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH
} from './constants'
import { isString } from './utils'

export class Car {
  #_name
  #_position

  constructor(name) {
    this.validate(name)

    this.#_name = name
    this.#_position = 0
  }

  validate(name) {
    if (!isString(name)) {
      throw new Error(ERROR_MESSAGE.INVALID_NAME_TYPE)
    }

    if (name.length < MIN_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH)
    }

    if (name.length >= MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGE.OVER_NAME_MAX_LENGTH)
    }
  }

  get name() {
    throw new Error(ERROR_MESSAGE.NOT_ACCESS_NAME)
  }
  set name(newName) {
    throw new Error(ERROR_MESSAGE.NOT_ASSIGN_NAME)
  }

  get position() {
    throw new Error(ERROR_MESSAGE.NOT_ACCESS_POSITION)
  }
  set position(newPosition) {
    throw new Error(ERROR_MESSAGE.NOT_ASSIGN_POSITION)
  }

  run(step) {
    if (step >= RUN_THRESHOLDS) {
      this.setPosition(this.getPosition() + DEFAULT_STEP_SIZE)
      this.printCarName()
    }
  }

  getName() {
    return this.#_name
  }

  printCarName() {
    console.log(this.getName())
  }

  getPosition() {
    return this.#_position
  }

  setPosition(newPosition) {
    this.#_position = newPosition
  }
}
