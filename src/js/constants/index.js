export const MIN_ATTEMPT_NUMBER = 1;

export const VALIDATE_TYPE = {
  NAME: 'name',
  ATTEMPT: 'attempt'
}

export const ALERT_MESSAGES = {
  NAME: {
    EMPTY: "이름을 입력해주세요.",
    MAX_LENGTH: "이름은 5자 이하로 입력해주세요.",
  },
  ATTEMPT: {
    EMPTY: '시도 횟수를 입력해주세요.',
    POSITIVE_NUMBER: '1 이상의 수를 입력해주세요.'
  }
}