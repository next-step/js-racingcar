import { RACE_TURN_LIMIT } from '../constants'
import {
  findItemsWithCondition,
  findMaxValue,
  makeRandomNum,
} from '../utils/helperUtils'

export class RaceTrack {
  #raceCars
  #turnCount
  #winners

  constructor(cars) {
    this.#raceCars = cars
    this.#turnCount = 0
    this.#winners = []
  }

  #findMaxPosition() {
    return findMaxValue(this.#raceCars, (car) => car.getPosition())
  }

  #determineWinners(maxPosition) {
    return findItemsWithCondition(
      this.#raceCars,
      (car) => car.getPosition() === maxPosition,
      (car) => car.getName(),
    )
  }

  #moveCars() {
    this.#raceCars.forEach((car) => {
      const score = makeRandomNum()
      car.move(score)
    })
  }

  #setWinners() {
    const maxPosition = this.#findMaxPosition()
    this.#winners = this.#determineWinners(maxPosition)
  }

  race() {
    for (let turn = 1; turn <= RACE_TURN_LIMIT; turn++) {
      this.#turnCount = turn
      this.#moveCars()
    }

    this.#setWinners()
  }

  get turnCount() {
    return this.#turnCount
  }

  get winners() {
    return this.#winners
  }
}
