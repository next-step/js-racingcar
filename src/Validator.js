import { MIN_CAR_NAME_LENGTH, MAX_CAR_NAME_LENGTH } from "./constants.js";

class Validator {
  static validateValidCarName(carName) {
    if (
      carName.length >= MIN_CAR_NAME_LENGTH &&
      carName.length <= MAX_CAR_NAME_LENGTH
    ) {
      return true;
    }
    throw new Error(
      `자동차의 이름은 최소 ${MIN_CAR_NAME_LENGTH}자, 최대 ${MAX_CAR_NAME_LENGTH}자이다.`
    );
  }
  static validateDuplicateCarName(carNames) {
    if (new Set([...carNames]).size !== carNames.length) {
      throw new Error(`자동차의 이름은 중복되지 않아야 한다.`);
    }
  }
}

export default Validator;
