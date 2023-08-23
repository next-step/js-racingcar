import RuntimeError from "../../RuntimeError";

export class CarNameNotStringError extends RuntimeError {
  static MESSAGE = "자동차 이름은 문자열이어야 합니다.";

  constructor() {
    super(CarNameNotStringError.MESSAGE);
  }
}

export class CarNameEmptyError extends RuntimeError {
  static MESSAGE = "자동차 이름은 빈 값으로 설정할 수 없습니다.";

  constructor() {
    super(CarNameEmptyError.MESSAGE);
  }
}

export class CarNameTooLongError extends RuntimeError {
  static MESSAGE = "자동차 이름은 5글자를 초과하여 설정할 수 없습니다.";

  constructor() {
    super(CarNameTooLongError.MESSAGE);
  }
}
