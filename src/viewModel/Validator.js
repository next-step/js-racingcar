import { isString, isNumber } from '../utils/validator'
import {
  CAR_ERROR_MESSAGE,
  CAR,
  RACING_CAR_LIST,
  RACE_ERROR_MESSAGE
} from '../constants/model'

export class Validator {
  constructor({ carNames, maxMatchLength }) {
    this.isValid = true
    this.error = ''
    this.carNames = carNames
    this.maxMatchLength = maxMatchLength

    this.validate({ carNames, maxMatchLength })
  }

  setError(error) {
    this.error = error
    this.isValid = false
  }

  validate({ carNames, maxMatchLength }) {
    if (!isString(carNames)) {
      this.setError(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE)
      return
    }

    this.#validateMinLength(carNames)
    this.#validateMaxLength(carNames)
    this.#validateIsUnique(carNames)
    this.#validateCarLength(carNames)
    this.#validateMatchLength(maxMatchLength)
  }

  #validateMinLength(carNames) {
    const names = carNames.split(',').map(name => name.trim())
    const isValidName = names.every(name => name.length >= CAR.MIN_NAME_LENGTH)

    if (isValidName) {
      return
    }

    this.setError(CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(CAR.MIN_NAME_LENGTH))
  }

  #validateMaxLength(carNames) {
    const names = carNames.split(',').map(name => name.trim())
    const isValidName = names.every(name => name.length <= CAR.MAX_NAME_LENGTH)

    if (isValidName) {
      return
    }

    this.setError(CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(CAR.MAX_NAME_LENGTH))
  }

  #validateIsUnique(carNames) {
    const parts = carNames.split(',').map(name => name.trim())
    const uniqueParts = new Set(parts)
    const isDuplicated = parts.length !== uniqueParts.size

    if (!isDuplicated) {
      return
    }

    this.setError(RACE_ERROR_MESSAGE.DUPLICATED_NAMES)
  }

  #validateCarLength(carNames) {
    const isEnoughParticipants =
      carNames.split(',').length >= RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH

    if (isEnoughParticipants) {
      return
    }

    this.setError(
      RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(
        RACING_CAR_LIST.MIN_PARTICIPANTS_LENGTH
      )
    )
  }

  #validateMatchLength(maxMatchLength) {
    const isValidMatchLength = isNumber(maxMatchLength)

    if (isValidMatchLength) {
      return
    }

    this.setError(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH)
  }
}
