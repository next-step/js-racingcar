class InvalidOverrideError extends Error {
  static MESSAGE = '메소드를 재정의해야 합니다.';

  constructor(msg = InvalidOverrideError.MESSAGE) {
    super(msg);
  }
}

export default InvalidOverrideError;
