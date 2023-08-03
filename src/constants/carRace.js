export const REQUIRE_METHODS_KEY = [
  'getName',
  'getPosition',
  'setPosition',
  'run'
]

export const DEFAULT_MAX_MATCH_LENGTH = 5
export const DEFAULT_RUN_CONDITION = () => true
export const MIN_PARTICIPANTS_LENGTH = 2

export const RACE_ERROR_MESSAGE = {
  OVER_MATCH_MAX_LENGTH: '최대 경기 횟수 이상으로 설정할 수 없습니다!',
  LACK_PARTICIPANTS: minNum =>
    `경주에 참여한 참여자들은 최소 ${minNum}명 이상이어야만 합니다!`,
  NOT_INCLUDE_METHOD: '경주에 필요한 필수 메서드가 없습니다!',
  NOT_VALID_MATCH_LENGTH: '최대 경기 횟수는 숫자여야만 합니다!'
}
