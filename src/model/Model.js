import { Observable } from '../utils/Observable'
import { getRandomNumber } from '../utils/number'
import { CAR } from '../constants/car'

export class Model extends Observable {
  #state

  constructor() {
    super()
    this.#state = {
      carList: [],
      winners: [],
      runCondition: () => getRandomNumber() > CAR.RUN_THRESHOLDS
    }
  }

  setState(newState) {
    this.#state = {
      ...this.#state,
      ...newState
    }

    this.notify(this.#state)
  }

  getState() {
    return this.#state
  }
}
