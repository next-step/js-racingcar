export const GAME_ERROR_MESSAGE = {
  GAME_TERMINATE_OF_ERROR: '오류로 인해 게임이 종료되었습니다!'
}

export const CAR_ERROR_MESSAGE = {
  OVER_NAME_MAX_LENGTH: maxNum =>
    `자동차의 이름은 ${maxNum}자 이하의 문자열만 가능합니다!`,
  UNDER_NAME_MIN_LENGTH: minNum =>
    `자동차의 이름은 최소 ${minNum}자 이상의 문자열만 가능합니다!`,
  INVALID_NAME_TYPE: '자동차의 이름은 문자열만 가능합니다!'
}

export const RACE_ERROR_MESSAGE = {
  OVER_MATCH_MAX_LENGTH: '최대 경기 횟수 이상으로 설정할 수 없습니다!',
  LACK_PARTICIPANTS: minNum =>
    `경주에 참여한 참여자들은 최소 ${minNum}명 이상이어야만 합니다!`,
  NOT_INCLUDE_METHOD: '경주에 필요한 필수 메서드가 없습니다!',
  NOT_VALID_MATCH_LENGTH: '최대 경기 횟수는 숫자여야만 합니다!'
}
