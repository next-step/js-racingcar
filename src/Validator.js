export class Validator {
  static MAX_CAR_NAME = 5;

  static validateCarNames(names) {
    const isValid = names.every((name) => Validator.isValidCarName(name));

    if (!isValid) {
      throw new Error(`자동차 이름을 ${Validator.MAX_CAR_NAME}자 이하로 입력해주세요.`);
    }
  }

  static isValidCarName(name) {
    return name.length <= Validator.MAX_CAR_NAME;
  }
}
