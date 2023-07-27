import { makeRandomNum } from '../utils'
import { RACE_TURN_LIMIT } from '../constants'

export class RaceTrack {
  #raceCars
  #turnCount
  #winners

  constructor(cars) {
    this.#raceCars = cars
    this.#turnCount = 0
    this.#winners = []
  }

  race() {
    for (let turn = 1; turn <= RACE_TURN_LIMIT; turn++) {
      this.#turnCount = turn

      this.#raceCars.forEach((car) => {
        const score = makeRandomNum()
        car.move(score)
      })
    }

    this.#setWinners()
  }

  // FIXME: setter 내부 로직 분리하기
  #setWinners() {
    let maxPosition = 0

    this.#raceCars.forEach((car) => {
      const position = car.getPosition()
      if (position > maxPosition) maxPosition = position
    })

    this.#winners = this.#raceCars
      .filter((car) => car.getPosition() === maxPosition)
      .map((car) => car.getName())
  }

  get turnCount() {
    return this.#turnCount
  }

  get winners() {
    return this.#winners
  }
}
