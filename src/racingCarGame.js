import { Car } from './car'
import {
  DEFAULT_MAX_MATCH_LENGTH,
  ERROR_MESSAGE,
  RUN_THRESHOLDS
} from './constants'
import { Race } from './race'
import { getRandomNumber } from './utils'

export class RacingCarGame {
  #_cars
  #_race

  constructor(names) {
    try {
      const cars = this.generateCarByNames(names)

      this.#_cars = cars
      this.#_race = new Race({
        participants: cars,
        runCondition: () => getRandomNumber() > RUN_THRESHOLDS
      })
    } catch (e) {
      console.log(ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
    }
  }

  start() {
    let match = 0

    while (match < DEFAULT_MAX_MATCH_LENGTH) {
      match++
      this.#_race.startRound()
    }

    console.log(`우승자: ${this.#_race.getWinners().join(', ')}`)
  }

  getParticipants() {
    return this.#_race.getParticipants()
  }

  getPositionOf(name) {
    return this.#_cars.find(car => car.getName() === name).getPosition()
  }

  generateCarByNames(names) {
    return names.split(',').map(name => new Car(name.trim()))
  }
}
