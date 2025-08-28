export class CarValidator {
  static CAR_NAME_LENGTH_MAX = 5;

  static validateCarNames(names) {
    const isValid = names.every((name) => CarValidator.isValidCarName(name));

    if (!isValid) {
      throw new Error(`자동차 이름을 ${CarValidator.CAR_NAME_LENGTH_MAX}자 이하로 입력해주세요.`);
    }
  }

  static isValidCarName(name) {
    return name.length <= CarValidator.CAR_NAME_LENGTH_MAX;
  }
}
