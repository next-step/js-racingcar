import { ERROR_MESSAGE } from './constants/error'
import { DEFAULT_STEP_SIZE, RUN_THRESHOLDS } from './constants/app'

export class Car {
  #_name
  #_position

  constructor(name) {
    this.#_name = name
    this.#_position = 0
  }

  get name() {
    return this.#_name
  }
  set name(newName) {
    throw new Error(ERROR_MESSAGE.NOT_ASSIGN_NAME)
  }

  get position() {
    return this.#_position
  }
  set position(newPosition) {
    throw new Error(ERROR_MESSAGE.NOT_ASSIGN_POSITION)
  }

  run(step) {
    if (step >= RUN_THRESHOLDS) {
      this.setPosition(this.position + DEFAULT_STEP_SIZE)
    }
  }

  getName() {
    return this.name
  }

  getPosition() {
    return this.position
  }

  setPosition(newPosition) {
    this.#_position = newPosition
  }
}
