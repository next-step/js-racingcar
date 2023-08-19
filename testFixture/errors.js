import RuntimeError from "../src/RuntimeError";

export class FixedNumberIsNotNumberError extends RuntimeError {
  static MESSAGE = "fixedNumber는 숫자여야 합니다.";

  constructor() {
    super(FixedNumberIsNotNumberError.MESSAGE);
  }
}
