import { Car } from './car'
import { DEFAULT_MAX_MATCH_LENGTH } from './constants/race'
import { RUN_THRESHOLDS } from './constants/car'
import { GAME_ERROR_MESSAGE } from './constants/error'
import { Race } from './race'
import { getRandomNumber } from './utils/number'

export class RacingCarGame {
  #cars
  #race

  constructor(names) {
    const origin = this
    this.#init(names)

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

  #init(names) {
    try {
      const cars = this.generateCarByNames(names)

      this.#cars = cars
      this.#race = new Race({
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
      this.#race.startRound()
    }

    console.log(`우승자: ${this.#race.getWinners().join(', ')}`)
  }

  reset() {
    this.#cars = []
    this.#race.reset()
  }

  setParticipants(names) {
    this.#init(names)
  }

  generateCarByNames(names) {
    return names.split(',').map(name => new Car(name.trim()))
  }

  getWinners() {
    return this.#race.getWinners()
  }

  getPositionOf(name) {
    return this.#cars.find(car => car.getName() === name).getPosition()
  }

  getParticipants() {
    return this.#race.getParticipants()
  }
}
