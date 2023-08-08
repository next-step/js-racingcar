import { CAR, CAR_ERROR_MESSAGE } from '../../constants/components/car'

export class Car {
  #state

  constructor(name) {
    this.#state = {
      name,
      position: 0
    }
  }

  run() {
    this.#state = {
      ...this.#state,
      position: this.position + CAR.DEFAULT_STEP_SIZE
    }
  }

  get name() {
    return this.#state.name
  }
  set name(_) {
    console.log(CAR_ERROR_MESSAGE.NOT_ASSIGN_NAME)
  }

  get position() {
    return this.#state.position
  }
  set position(_) {
    console.log(CAR_ERROR_MESSAGE.NOT_ASSIGN_POSITION)
  }
}
