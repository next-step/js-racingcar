import { CAR, CAR_ERROR_MESSAGE } from '../../constants/car'
import { Observable } from '../../utils/Observable'
import { isString, isFunction } from '../../utils/validator'

export class CarValidator extends Observable {
  constructor() {
    super()
  }

  validate({ name, onRun }) {
    this.#validateIsString(name)
    this.#validateMinLength(name)
    this.#validateMaxLength(name)
    this.#validateOnRun(onRun)
  }

  #validateIsString(name) {
    if (isString(name)) {
      return
    }

    this.notify({
      error: {
        cause: CAR.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      }
    })
  }

  #validateMinLength(name) {
    const isValidLength = !(
      isString(name) && name.length <= CAR.MIN_NAME_LENGTH
    )

    if (isValidLength) {
      return
    }

    this.notify({
      error: {
        cause: CAR.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(CAR.MIN_NAME_LENGTH)
      }
    })
  }

  #validateMaxLength(name) {
    const isValidLength = !(isString(name) && name.length > CAR.MAX_NAME_LENGTH)

    if (isValidLength) {
      return
    }

    this.notify({
      error: {
        cause: CAR.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(CAR.MAX_NAME_LENGTH)
      }
    })
  }

  #validateOnRun(onRun) {
    const isValidMethod = onRun && isFunction(onRun)

    if (isValidMethod) {
      return
    }

    this.notify({
      error: {
        cause: CAR.CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_ON_RUN_TYPE
      }
    })
  }
}
