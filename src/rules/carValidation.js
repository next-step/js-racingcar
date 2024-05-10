import { MAXIMUM_CAR_NAME_LENGTH, MINIMUM_CAR_NAME_LENGTH } from '../constants/index.js'
import { DUPLICATED_CARS_MSG, NONEXISTENT_CARS_MSG, WRONG_LENGTH_CARS_MSG} from "../constants/error.js"

export const carValidation = {
  isValidCarAmount(names) {
    return !!names
  },

  isValidCarDuplication(names) {
    return names.split(',').length === new Set(names.split(',')).size
  },

  isValidCarNameLength(names) {
    return names
      .split(',')
      .every(
        (name) =>
          name.trim().length >= MINIMUM_CAR_NAME_LENGTH &&
          name.trim().length <= MAXIMUM_CAR_NAME_LENGTH
      )
  },

  validates(names) {
    if (!this.isValidCarAmount(names)) {
      console.log(NONEXISTENT_CARS_MSG)
      return false
    }

    if (!this.isValidCarDuplication(names)) {
      console.log(DUPLICATED_CARS_MSG)
      return false
    }

    if (!this.isValidCarNameLength(names)) {
      console.log(WRONG_LENGTH_CARS_MSG)
      return false
    }

    return true
  },
}
