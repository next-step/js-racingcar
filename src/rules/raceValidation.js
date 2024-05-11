import {
  NONEXISTENT_ROUND_MSG,
  INVALID_RANGE_ROUND_MSG,
  INVALID_TYPEOF_ROUND_MSG,
} from '../constants/error.js'
import { MAXIMUM_ROUND_VALUE, MINIMUM_ROUND_VALUE } from '../constants/index.js'

export const raceValidation = {
  /**
   * @param {string} round
   * @return boolean
   */
  validates(round) {
    if (!this.isValidInputExistent(round)) {
      console.log(NONEXISTENT_ROUND_MSG)
      return false
    }

    if (!this.validatesNumber(round)) {
      console.log(INVALID_TYPEOF_ROUND_MSG)
      return false
    }

    if (!this.isValidRange(round)) {
      console.log(INVALID_RANGE_ROUND_MSG)
      return false
    }

    return true
  },

  validatesNumber(round) {
    if (!this.isValidNaN(round)) return false
    if (!this.isValidWhitespace(round)) return false

    return true
  },

  isValidInputExistent(round) {
    return !!round
  },

  isValidRange(round) {
    return MINIMUM_ROUND_VALUE <= +round && +round <= MAXIMUM_ROUND_VALUE
  },

  isValidNaN(round) {
    return !isNaN(+round)
  },

  isValidWhitespace(round) {
    return !round.split('').some((char) => char === ' ')
  },
}
