import { Observable } from '../utils/Observable'
import { getRandomNumber } from '../utils/number'
import { CAR } from '../constants/components/car'
import { RACE } from '../constants/components/race'

export class Model extends Observable {
  #state

  constructor() {
    super()
    this.#state = {
      carList: [],
      winnerList: [],
      maxMatchLength: RACE.DEFAULT_MAX_MATCH_LENGTH,
      runCondition: () => getRandomNumber() > CAR.RUN_THRESHOLDS
    }
  }

  setState(state) {
    this.#state = {
      ...this.#state,
      ...state
    }

    this.notify(this.#state)
  }

  getState() {
    return this.#state
  }

  destroy() {
    this.unsubscribeAll()
  }
}
