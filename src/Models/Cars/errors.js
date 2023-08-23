import RuntimeError from "../../RuntimeError";

export class DuplicatedCarNameError extends RuntimeError {
  static MESSAGE = "중복된 자동차 이름으로는 프로그램이 동작할 수 없습니다.";

  constructor() {
    super(DuplicatedCarNameError.MESSAGE);
  }
}
