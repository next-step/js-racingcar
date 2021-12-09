export const STORE_STATUS = {
  RESTING: 'resting',
  MUTATION: 'mutation',
  ACTION: 'action',
};

export const ERROR_MESSAGES = {
  SHOULD_USE_MUTATION: '상태를 변경 할 시 mutation을 사용해야 합니다.',
  DUPLICATED_CAR_NAMES: '자동차 이름에 중복된 이름이 있습니다.',
  TYPE_ONLY_NUMBER: '시도 할 횟수를 숫자로 입력해주세요.',
  NO_CAR_NAMES: '자동차 이름을 입력하세요.',
  NO_TRY_COUNTS: '시도 횟수를 입력해주세요.',
  MAXIMUM_CAR_NAMES_LENGTH: '자동차의 이름은 5글자를 넘을 수 없습니다.',
};

export const EVENTS = {
  STATE_CHANGE: 'stateChange',
};

export const ACTIONS = {
  SET_CAR_NAMES: 'setCarNames',
  SET_PROCESS_MATRIX: 'setProcessMatrix',
  SET_WINNERS: 'setWinners',
  SET_TRY_COUNTS: 'setTryCounts',
};
