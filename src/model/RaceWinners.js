import { findItemsWithCondition, findMaxValue } from '../utils/helperUtils.js'

export class RaceWinners {
  #winners

  constructor() {
    this.#winners = []
  }

  #findMaxPosition(raceCars) {
    return findMaxValue(raceCars, (car) => car.position)
  }

  #determineWinners(raceCars, maxPosition) {
    return findItemsWithCondition(
      raceCars,
      (car) => car.position === maxPosition,
      (car) => car.name,
    )
  }

  setWinners(raceCars) {
    const maxPosition = this.#findMaxPosition(raceCars)
    const winners = this.#determineWinners(raceCars, maxPosition)
    this.#winners = winners.join(',') + '(이)가 최종 우승했습니다.'
  }

  get winners() {
    return this.#winners
  }
}
