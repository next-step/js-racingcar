import Validator from "./Validator.js";

class Racing {
  #cars
  #count
  
  constructor(cars, count) {
    this.#cars = cars,
    this.#count = count
  }

  static get validate() {
    return {
      carNameLength(text = '') {
        return Validator.isEmpty(text) || Validator.isCorrectLength(text)
      },

      racingCount(text = '') {
        return Validator.isCorrectCount(text)
      }
    }
  }

  static get readyToCar() {
    return {

    }
  }
}

export default Racing;

