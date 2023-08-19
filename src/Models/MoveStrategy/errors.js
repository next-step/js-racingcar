import RuntimeError from "../../RuntimeError";

export class MoveStrategyIsAbstractClassError extends RuntimeError {
  static MESSAGE = "MoveStrategy는 추상 클래스입니다.";

  constructor() {
    super(MoveStrategyIsAbstractClassError.MESSAGE);
  }
}

export class GenerateNumberNotImplementedError extends RuntimeError {
  static MESSAGE = "generateNumber()가 구현되지 않았습니다.";

  constructor() {
    super(GenerateNumberNotImplementedError.MESSAGE);
  }
}

export class IsMovableNotImplementedError extends RuntimeError {
  static MESSAGE = "isMovable()이 구현되지 않았습니다.";

  constructor() {
    super(IsMovableNotImplementedError.MESSAGE);
  }
}

export class ConditionFunctionNotFunctionError extends RuntimeError {
  static MESSAGE = "conditionFunc은 함수여야 합니다.";

  constructor() {
    super(ConditionFunctionNotFunctionError.MESSAGE);
  }
}

export class MinMaxNumberIsNotNumberError extends RuntimeError {
  static MESSAGE = "min, max는 숫자여야 합니다.";

  constructor() {
    super(MinMaxNumberIsNotNumberError.MESSAGE);
  }
}

export class MinNumberGreaterThanMaxNumberError extends RuntimeError {
  static MESSAGE = "min은 max 보다 클 수 없습니다.";

  constructor() {
    super(MinNumberGreaterThanMaxNumberError.MESSAGE);
  }
}

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
