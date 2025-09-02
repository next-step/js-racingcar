import { assert } from "../utils/assert.js";

export class CarValidator {
  static CAR_NAME_LENGTH_MAX = 5;

  static validateCarNames(names) {
    const isValid = names.every((name) => CarValidator.isValidCarName(name));

    assert(isValid, `자동차 이름을 ${CarValidator.CAR_NAME_LENGTH_MAX}자 이하로 입력해주세요.`);
  }

  static validateCarName(name) {
    const isValid = CarValidator.isValidCarName(name);

    assert(isValid, `자동차 이름을 ${CarValidator.CAR_NAME_LENGTH_MAX}자 이하로 입력해주세요.`);
  }

  static isValidCarName(name) {
    return name.length <= CarValidator.CAR_NAME_LENGTH_MAX;
  }
}
