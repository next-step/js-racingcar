const INVALID_MESSAGES = {
  NAME: {
    EMPTY: '이름을 입력해주세요.',
    MAX_LENGTH: '이름은 5자 이하로 입력해주세요.',
  },
};

class ValidationError extends Error {
  constructor(msg, errorEvent) {
    super(msg);
    this.errorEvent = errorEvent;
  }
}

export default ValidationError;
export { INVALID_MESSAGES };
