class ValidationError extends Error {
  constructor(msg, errorEvent) {
    super(msg);
    this.errorEvent = errorEvent;
  }
}

class NameIsFalsyError extends ValidationError {
  constructor(errorEvent) {
    super('이름을 입력해주세요.', errorEvent);
  }
}

class NameLengthOverflowError extends ValidationError {
  constructor(errorEvent) {
    super('이름은 5자 이하로 입력해주세요.', errorEvent);
  }
}

export default ValidationError;
export { NameIsFalsyError, NameLengthOverflowError };
