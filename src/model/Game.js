import { ERROR_MESSAGE } from '../constants/errorMessages.js'
import { Cars } from './Cars.js'
import { RaceRecords } from './RaceRecords.js'
import { RaceWinners } from './RaceWinners.js'

export class Game {
  static DEFAULT_ROUNDS = 5
  static DEFAULT_CURRENT_ROUND = 1
  static MOVE_THRESHOLD = 4
  #cars
  #entries
  #rounds
  #currentRound
  #currentRecord
  #records
  #winners

  constructor(carNames, rounds = Game.DEFAULT_ROUNDS) {
    this.#validateCarName(carNames)
    this.#validateRounds(rounds)
    this.#cars = new Cars(carNames)
    this.#entries = this.#cars.entries
    this.#rounds = rounds
    this.#currentRound = Game.DEFAULT_CURRENT_ROUND
    this.#currentRecord = {}
    this.#records = new RaceRecords()
  }

  run(moveCondition = this.#determineShouldMove) {
    for (let round = this.#currentRound; round <= this.#rounds; round++) {
      this.#currentRound = round

      // 조건을 넘겨 자동차를 전진시킴
      this.#cars.move(moveCondition)

      // 각 라운드별 기록을 저장함
      const record = this.#convertStatusToRecord(this.#cars.status)
      this.#records.add(record)
    }

    // 모든 라운드 종료 후 우승자를 선정함
    this.#setWinners(this.#records.records)
  }

  #validateCarName(carNames) {
    if (
      !carNames ||
      !Array.isArray(carNames) ||
      carNames.some((name) => !name || typeof name !== 'string')
    ) {
      throw new Error(ERROR_MESSAGE.NAMES_TO_BE_VALID)
    }
  }

  #validateRounds(rounds) {
    const roundsNumber = Number(rounds)

    if (!roundsNumber || isNaN(roundsNumber) || roundsNumber <= 0) {
      throw new Error(ERROR_MESSAGE.ROUNDS_TO_BE_VALID)
    }
  }

  #determineShouldMove(limit = 9) {
    const randomNumber = Math.ceil(Math.random() * limit)
    return randomNumber > Game.MOVE_THRESHOLD
  }

  #convertStatusToRecord(statuses) {
    const record = {}
    statuses.forEach((status) => (record[status.name] = status.position))

    return record
  }

  #setWinners(records) {
    this.#winners = new RaceWinners(records).winners
  }

  get entries() {
    return this.#entries
  }

  get rounds() {
    return this.#rounds
  }

  get currentRound() {
    return this.#currentRound
  }

  get currentRecord() {
    return this.#currentRecord
  }

  get records() {
    return this.#records.records
  }

  get winners() {
    return this.#winners
  }
}
