export class Validator {
  static MAX_CAR_NAME = 5;

  static validateCarNames(names) {
    const isValid = names.every((name) => Validator.isValidCarName(name));

    if (!isValid) {
      throw new Error("자동차 이름의 길이가 적절하지 않습니다.");
    }
  }

  static isValidCarName(name) {
    return name.length <= Validator.MAX_CAR_NAME;
  }
}
