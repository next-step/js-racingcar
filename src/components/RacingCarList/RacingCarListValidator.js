import { Observable } from '../../utils/Observable'
import { isString, isFunction, isNumber } from '../../utils/validator'
import { CAR, CAR_ERROR_MESSAGE } from '../../constants/car'
import {
  RACING_CAR_LIST,
  RACE_ERROR_MESSAGE
} from '../../constants/racingCarList'

export class RacingCarListValidator extends Observable {
  constructor() {
    super()
  }

  validate({ carNames, maxMatchLength, onEndRound }) {
    if (!isString(carNames)) {
      this.notify({
        error: {
          cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
          message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
        }
      })
      return
    }

    this.#validateMinLength(carNames)
    this.#validateMaxLength(carNames)
    this.#validateIsUnique(carNames)
    this.#validateCarLength(carNames)
    this.#validateIsFunction(onEndRound)
    this.#validateMatchLength(maxMatchLength)
  }

  #validateMinLength(carNames) {
    const names = carNames.split(',').map(name => name.trim())
    const isValidName = names.every(name => name.length >= CAR.MIN_NAME_LENGTH)

    if (isValidName) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(CAR.MIN_NAME_LENGTH)
      }
    })
  }

  #validateMaxLength(carNames) {
    const names = carNames.split(',').map(name => name.trim())
    const isValidName = names.every(name => name.length <= CAR.MAX_NAME_LENGTH)

    if (isValidName) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(CAR.MAX_NAME_LENGTH)
      }
    })
  }

  #validateIsUnique(carNames) {
    const parts = carNames.split(',').map(name => name.trim())
    const uniqueParts = new Set(parts)
    const isDuplicated = parts.length !== uniqueParts.size

    if (!isDuplicated) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.DUPLICATED_NAMES
      }
    })
  }

  #validateIsFunction(onEndRound) {
    const isValidFunction = onEndRound && isFunction(onEndRound)

    if (isValidFunction) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_VALID_ON_END_ROUND
      }
    })
  }

  #validateCarLength(carNames) {
    const isEnoughParticipants =
      carNames.split(',').length >= RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH

    if (isEnoughParticipants) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(
          RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH
        )
      }
    })
  }

  #validateMatchLength(maxMatchLength) {
    const isValidMatchLength = isNumber(maxMatchLength)

    if (isValidMatchLength) {
      return
    }

    this.notify({
      error: {
        cause: RACING_CAR_LIST.CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH
      }
    })
  }
}
