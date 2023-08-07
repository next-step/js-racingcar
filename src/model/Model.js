import { Observable } from '../utils/Observable'
import { getRandomNumber } from '../utils/number'
import { CAR } from '../constants/car'
import { RACING_CAR_LIST } from '../constants/racingCarList'

export class Model extends Observable {
  #state

  constructor() {
    super()
    this.#state = {
      carList: [],
      winnerList: [],
      maxMatchLength: RACING_CAR_LIST.DEFAULT_MAX_MATCH_LENGTH,
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
