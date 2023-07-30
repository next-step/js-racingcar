import { RACE_TURN_LIMIT } from '../constants/race.js'
import { CarMover } from './CarMover.js'
import { RaceRecord } from './RaceRecord.js'
import { RaceWinners } from './RaceWinners.js'

export class RaceTrack {
  #carMover
  #raceRecord
  #raceWinners
  #turnCount

  constructor(cars) {
    this.#carMover = new CarMover(cars)
    this.#raceRecord = new RaceRecord()
    this.#raceWinners = new RaceWinners()
    this.#turnCount = 0
  }

  race() {
    for (let turn = 1; turn <= RACE_TURN_LIMIT; turn++) {
      this.#turnCount = turn

      const carPositions = this.#carMover.moveCars()
      this.#raceRecord.setRecords(carPositions)
    }

    this.#raceWinners.setWinners(this.#carMover.raceCars)
  }

  get turnCount() {
    return this.#turnCount
  }

  get records() {
    return this.#raceRecord.records
  }

  get winners() {
    return this.#raceWinners.winners
  }
}
