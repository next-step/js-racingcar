import { CAR_RACE_CONFIG } from "./constants.js";

class Validator {
  static carNameValidate(name) {
    if (!name) {
      throw new Error("자동차 이름 입력값이 비었습니다.");
    }
    if (name.length > CAR_RACE_CONFIG.MAX_NAME_LENGTH) {
      throw new Error(
        `자동차 이름은 ${CAR_RACE_CONFIG.MAX_NAME_LENGTH}자 이하만 가능합니다.`
      );
    }
  }
}

export default Validator;
