import {
  CAR_ERROR_MESSAGE,
  DEFAULT_STEP_SIZE,
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
      throw new Error(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE)
    }

    if (name.length < MIN_NAME_LENGTH) {
      throw new Error(CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH)
    }

    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH)
    }
  }

  run() {
    this.setPosition(this.getPosition() + DEFAULT_STEP_SIZE)
    this.printCarName()
  }

  printCarName() {
    const position = Array.from({ length: this.getPosition() }).reduce(
      prev => prev + '-',
      ''
    )

    console.log(`${this.getName()}: ${position}`)
  }

  setPosition(newPosition) {
    this.#_position = newPosition
  }

  getName() {
    return this.#_name
  }

  getPosition() {
    return this.#_position
  }

  get name() {
    throw new Error(CAR_ERROR_MESSAGE.NOT_ACCESS_NAME)
  }
  set name(_) {
    throw new Error(CAR_ERROR_MESSAGE.NOT_ASSIGN_NAME)
  }

  get position() {
    throw new Error(CAR_ERROR_MESSAGE.NOT_ACCESS_POSITION)
  }
  set position(_) {
    throw new Error(CAR_ERROR_MESSAGE.NOT_ASSIGN_POSITION)
  }
}
