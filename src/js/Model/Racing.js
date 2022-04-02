import Validator from "./Validator.js";

class Racing {
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
}

export default Racing;

