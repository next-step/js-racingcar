import {
  DEFAULT_MAX_MATCH_LENGTH,
  DEFAULT_RUN_CONDITION,
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE,
  CAR_RACE_CONSTRUCTOR_NAME
} from './constants/carRace'
import { isString, isNumber, isFunction } from './utils/validator'
import { CustomError } from './utils/customError'
import { Car } from './car'
import { CAR_ERROR_MESSAGE } from './constants/car'

export class CarRace {
  #cars
  #match
  #maxMatchLength
  #runCondition
  #onEndRound

  constructor({
    carNames,
    maxMatchLength = DEFAULT_MAX_MATCH_LENGTH,
    runCondition = DEFAULT_RUN_CONDITION,
    onEndRound = () => {}
  }) {
    this.#validate(carNames, maxMatchLength, onEndRound)
    this.#init(carNames, maxMatchLength, runCondition, onEndRound)
  }

  #validate(carNames, maxMatchLength, onEndRound) {
    this.#validateIsString(carNames)
    this.#validateIsUnique(carNames)
    this.#validateCarLength(carNames)
    this.#validateIsFunction(onEndRound)
    this.#validateMatchLength(maxMatchLength)
  }

  #init(carNames, maxMatchLength, runCondition, onEndRound) {
    this.#match = 0
    this.#cars = this.#generateCarByNames(carNames)
    this.#maxMatchLength = maxMatchLength
    this.#runCondition = runCondition
    this.#onEndRound = onEndRound

    this.#cars.forEach(car => car.setPosition(0))
  }

  startRound() {
    const isOverMaxMatch = this.#match + 1 > this.#maxMatchLength
    if (isOverMaxMatch) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH
      })
    }

    this.#match++
    this.#runCars()
    this.#onEndRound(this.#cars)
  }

  getMaxMatchLength() {
    return this.#maxMatchLength
  }

  getCars() {
    return this.#cars
  }

  getPositionOf(name) {
    this.#validateIsString(name)
    this.#validateIsInclude(name)

    const car = this.#cars.find(car => car.getName() === name)
    return car.getPosition()
  }

  getWinners() {
    const highestPosition = Math.max(
      ...this.#cars.map(car => car.getPosition())
    )
    const winners = this.#cars.filter(
      car => car.getPosition() === highestPosition
    )

    return this.#match !== this.#maxMatchLength
      ? []
      : winners.map(winner => winner.getName())
  }

  #runCars() {
    this.#cars.filter(this.#runCondition).forEach(car => car.run())
  }

  #generateCarByNames(names) {
    return names.split(',').map(name => new Car({ name: name.trim() }))
  }

  #validateIsString(carNames) {
    if (!isString(carNames)) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      })
    }
  }

  #validateIsUnique(carNames) {
    const parts = carNames.split(',').map(name => name.trim())
    const uniqueParts = new Set(parts)
    const isDuplicated = parts.length !== uniqueParts.size

    if (isDuplicated) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.DUPLICATED_NAMES
      })
    }
  }

  #validateIsInclude(name) {
    const car = this.#cars.find(car => car.getName() === name)

    if (!car) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_INCLUDE_CAR
      })
    }
  }

  #validateIsFunction(onEndRound) {
    if (!isFunction(onEndRound)) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_VALID_ON_END_ROUND
      })
    }
  }

  #validateCarLength(carNames) {
    const cars = this.#generateCarByNames(carNames)
    const isEnoughParticipants = cars.length >= MIN_PARTICIPANTS_LENGTH

    if (!isEnoughParticipants) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
      })
    }
  }

  #validateMatchLength(maxMatchLength) {
    const isValidMatchLength = isNumber(maxMatchLength)

    if (!isValidMatchLength) {
      throw new CustomError({
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH
      })
    }
  }
}
