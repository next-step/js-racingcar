class InvalidRoundError extends Error {
  constructor() {
    super('횟수를 1 이상의 숫자로 입력해주세요')
    this.name = 'InvalidRoundError'
  }
}

export const RaceError = {
  InvalidRound: InvalidRoundError,
}