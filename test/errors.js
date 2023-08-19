import RuntimeError from "../src/RuntimeError";

export class StrategiesNotStringError extends RuntimeError {
  static MESSAGE = "strategies는 문자열이어야 합니다.";

  constructor() {
    super(StrategiesNotStringError.MESSAGE);
  }
}

export class StrategyElementNotRorNumericError extends RuntimeError {
  static MESSAGE = "strategies의 원소는 R 또는 0~9의 숫자여야 합니다.";

  constructor() {
    super(StrategyElementNotRorNumericError.MESSAGE);
  }
}

export class FixedNumberIsNotNumberError extends RuntimeError {
  static MESSAGE = "fixedNumber는 숫자여야 합니다.";

  constructor() {
    super(FixedNumberIsNotNumberError.MESSAGE);
  }
}
