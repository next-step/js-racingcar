export const CAR_RACE_CONSTRUCTOR_NAME = 'CarRace'
export const DEFAULT_MAX_MATCH_LENGTH = 5
export const DEFAULT_RUN_CONDITION = () => true
export const MIN_PARTICIPANTS_LENGTH = 2

export const RACE_ERROR_MESSAGE = {
  DUPLICATED_NAMES: '경주에 참여한 자동차의 이름에 중복이 있으면 안됩니다!',
  OVER_MATCH_MAX_LENGTH: '최대 경주 횟수 이상으로 설정할 수 없습니다!',
  LACK_PARTICIPANTS: minNum =>
    `경주에 참여한 자동차들은 최소 ${minNum}명 이상이어야만 합니다!`,
  NOT_VALID_MATCH_LENGTH: '최대 경주 횟수는 숫자여야만 합니다!',
  NOT_VALID_ON_END_ROUND: 'onEndRound 속성은 함수여야만 합니다!',
  NOT_INCLUDE_CAR: '경주에 참여하지 않은 자동차 이름입니다!'
}
