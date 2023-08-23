import RuntimeError from "../../RuntimeError";

export class CarNamesIsEmptyError extends RuntimeError {
  static MESSAGE =
    "자동차 이름들을 입력하지 않으면, 프로그램이 동작할 수 없습니다.";

  constructor() {
    super(CarNamesIsEmptyError.MESSAGE);
  }
}

export class TotalRoundsIsEmptyError extends RuntimeError {
  static MESSAGE =
    "총 라운드 수를 입력하지 않으면, 프로그램이 동작할 수 없습니다.";

  constructor() {
    super(TotalRoundsIsEmptyError.MESSAGE);
  }
}

export class TotalRoundsNotNumberError extends RuntimeError {
  static MESSAGE = "시도 횟수로는 숫자를 입력해주세요.";

  constructor() {
    super(TotalRoundsNotNumberError.MESSAGE);
  }
}

export class TotalRoundsNotIntegerError extends RuntimeError {
  static MESSAGE = "시도 횟수로는 정수를 입력해주세요.";

  constructor() {
    super(TotalRoundsNotIntegerError.MESSAGE);
  }
}

export class TotalRoundsNotPositiveError extends RuntimeError {
  static MESSAGE = "시도 횟수로는 1 이상의 숫자를 입력해주세요.";

  constructor() {
    super(TotalRoundsNotPositiveError.MESSAGE);
  }
}
