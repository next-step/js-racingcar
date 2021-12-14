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
  MINIMUM_TRY_COUNTS: '시도 횟수는 0을 초과해야 합니다.',
};

export const ACTIONS = {
  SET_CAR_NAMES: 'setCarNames',
  SET_PROGRESS_MATRIX: 'setProgressMatrix',
  SET_WINNERS: 'setWinners',
  SET_TRY_COUNTS: 'setTryCounts',
  INIT_STATE: 'initState',
};

export const TEST_DOM = {
  CAR_NAMES_FORM: 'carNamesForm',
  CAR_NAMES_INPUT: 'carNamesInput',
  CAR_NAMES_SUBMIT_BUTTON: 'carNamesSubmitBtn',
  TRY_COUNTS_FORM: 'tryCountsForm',
  TRY_COUNTS_INPUT: 'tryCountsInput',
  TRY_COUNTS_SUBMIT_BUTTON: 'tryCountsSubmitBtn',
  CAR_PROGRESS_CONTAINER: 'carProgressContainer',
  WINNER_BOARD: 'winnerBoard',
  CAR_PROGRESS: 'carProgress',
};

export const ONE_SECOND = 1000;
export const DONE_MESSAGE = '축하합니다.';
