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

  setCarList(carList) {
    this.#state = {
      ...this.#state,
      carList
    }

    this.notify(this.#state)
  }

  setWinnerList(winnerList) {
    this.#state = {
      ...this.#state,
      winnerList
    }

    this.notify(this.#state)
  }

  setMaxMatchLength(maxMatchLength) {
    this.#state = {
      ...this.#state,
      maxMatchLength
    }

    this.notify(this.#state)
  }

  getState() {
    return this.#state
  }
}
