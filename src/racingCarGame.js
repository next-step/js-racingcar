import { DEFAULT_MAX_MATCH_LENGTH } from './constants/race'
import { RUN_THRESHOLDS } from './constants/car'
import { GAME_ERROR_MESSAGE } from './constants/racingCarGame'
import { getRandomNumber } from './utils/number'
import { Car } from './car'
import { Race } from './race'
import { CustomError } from './utils/customError'

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
          } catch (error) {
            if (error.cause === undefined) {
              console.log(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
              return
            }

            console.log(error.message)
          }
        }
      }
    })
  }

  #init(names) {
    try {
      this.#validate(names)
      const cars = this.generateCarByNames(names)

      this.#cars = cars
      this.#race = new Race({
        participants: cars,
        runCondition: () => getRandomNumber() > RUN_THRESHOLDS
      })
    } catch (error) {
      if (error.cause === undefined) {
        console.log(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
        return
      }

      console.log(error.message)
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

  #validate(names) {
    const parts = names.split(',').map(name => name.trim())
    const uniqueParts = new Set(parts)
    const isDuplicated = parts.length !== uniqueParts.size

    if (isDuplicated) {
      throw new CustomError({
        cause: this,
        message: GAME_ERROR_MESSAGE.DUPLICATED_NAMES
      })
    }
  }
}
