import { CAR } from '../constants/car'

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
    console.log('name을 직접 할당할 수 없습니다.')
  }

  get position() {
    return this.#state.position
  }
  set position(_) {
    console.log('position을 직접 할당할 수 없습니다.')
  }
}
