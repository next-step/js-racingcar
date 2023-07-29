import { RACE_TURN_LIMIT } from '../constants'
import {
  findItemsWithCondition,
  findMaxValue,
  makeRandomNum,
} from '../utils/helperUtils'
import { Car } from './Car'

export class RaceTrack {
  #raceCars
  #turnCount
  #winners

  constructor(cars) {
    this.#raceCars = this.#getRaceCars(cars)
    this.#turnCount = 0
    this.#winners = []
  }

  #getRaceCars(cars) {
    return cars.map((carName) => new Car(carName))
  }

  #findMaxPosition() {
    return findMaxValue(this.#raceCars, (car) => car.position)
  }

  #determineWinners(maxPosition) {
    return findItemsWithCondition(
      this.#raceCars,
      (car) => car.position === maxPosition,
      (car) => car.name,
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

  get raceCars() {
    return this.#raceCars
  }

  get turnCount() {
    return this.#turnCount
  }

  get winners() {
    return this.#winners
  }
}
