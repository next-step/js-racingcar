import { Car } from './car'
import {
  DEFAULT_MAX_MATCH_LENGTH,
  GAME_ERROR_MESSAGE,
  RUN_THRESHOLDS
} from './constants'
import { Race } from './race'
import { getRandomNumber } from './utils'

export class RacingCarGame {
  #_cars
  #_race

  constructor(names) {
    const origin = this
    this.init(names)

    return new Proxy(this, {
      get(target, key) {
        const method = Reflect.get(target, key)

        return (...args) => {
          try {
            return method.apply(origin, args)
          } catch (e) {
            console.log(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
          }
        }
      }
    })
  }

  init(names) {
    try {
      const cars = this.generateCarByNames(names)

      this.#_cars = cars
      this.#_race = new Race({
        participants: cars,
        runCondition: () => getRandomNumber() > RUN_THRESHOLDS
      })
    } catch (e) {
      console.log(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
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

  reset() {
    this.#_cars = []
    this.#_race.reset()
  }

  getWinners() {
    return this.#_race.getWinners()
  }

  getPositionOf(name) {
    return this.#_cars.find(car => car.getName() === name).getPosition()
  }

  getParticipants() {
    return this.#_race.getParticipants()
  }
  setParticipants(names) {
    this.init(names)
  }

  generateCarByNames(names) {
    return names.split(',').map(name => new Car(name.trim()))
  }
}
