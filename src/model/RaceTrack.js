import { RACE_TURN_LIMIT } from '../constants/race.js'
import {
  findItemsWithCondition,
  findMaxValue,
  makeRandomNum,
} from '../utils/helperUtils.js'
import { Car } from './Car.js'

export class RaceTrack {
  #raceCars
  #turnCount
  #positions
  #winners
  #records

  constructor(cars) {
    this.#raceCars = this.#getRaceCars(cars)
    this.#turnCount = 0
    this.#winners = []
    this.#positions = {}
    this.#records = `실행 결과\n`
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

      const currentCarPosition = { car: car.name, position: car.position }
      this.#setPositions(currentCarPosition)
    })
  }

  #setWinners() {
    const maxPosition = this.#findMaxPosition()
    const winners = this.#determineWinners(maxPosition)
    this.#winners = winners.join(',') + '(이)가 최종 우승했습니다.'
  }

  #setPositions(currentCarPosition) {
    const { car, position } = currentCarPosition
    this.#positions[car] = position
  }

  #setRecords() {
    let result = ``

    for (const [car, position] of Object.entries(this.#positions)) {
      result += `${car} : ${'-'.repeat(position)}\n`
    }

    this.#records += result + `\n`
  }

  race() {
    for (let turn = 1; turn <= RACE_TURN_LIMIT; turn++) {
      this.#turnCount = turn
      this.#moveCars()
      this.#setRecords()
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

  get records() {
    return this.#records
  }
}
