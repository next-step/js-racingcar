import Validator from "./Validator.js";

class Racing {
  static get validate() {
    return {
      carNameLength(text = '') {
        return Validator.isEmpty(text)
      }
    }
  }
}

export default Racing;

