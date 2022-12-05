import { makeDataAttributeIdForm } from './utils/index.js';
export const DEFAULT_STORE_STATE = {
  carNames: '',
  trialNumber: null,
  isVisibleTrial: false,
  isVisibleProgress: false,
  isVisibleResult: false,
  isRacingEnd: false,
  racingMap: null,
};

export const EVENT_MAP = {
  CLICK: new Map(),
  KEY_UP: new Map(),
  SUBMIT: new Map(),
};

export const ELEMENT = {
  DATAID: {
    CAR_NAME_INPUT: 'car-name-input',
    MOVE_SUBMIT: 'move-submit',
    MOVE_INPUT: 'move-input',
    SUMIT_CARNAME: 'submit-carname',
  },
  CLASS: {
    CAR_NAME_INPUT: 'car-name-input',
    MOVE_INPUT: 'move-input',
    MOVE_SUBMIT_BUTTON: 'move-submit-button',
    TRIAL_COUNT_WRAPPER: 'trial-count-wrapper',
    NAME_SUBMIT_BUTTON: 'name-submit-button',
  },
};

export const ELEMENT_DATA_ID_FORM = makeDataAttributeIdForm(ELEMENT.DATAID);

export const ALERT = {
  INVALID_CARNAME:
    '유효하지 않은 이름 길이입니다. 자동차의 이름은 1자이상, 5자 이하만 가능합니다.',
  RACING_END: '레이싱이 끝났습니다',
};
