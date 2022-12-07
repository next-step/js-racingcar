export const NAME = {
  CAR_NAME: 'car-name',
  RACING_COUNT: 'racing-count',
};

export const GAME_STATE = {
  INITIAL: 'initial',
  READY: 'ready',
  PLAYING: 'playing',
  FINISHED: 'finished',
};

export const SELECTOR = {
  FIELDSET: {
    CAR_NAME: `fieldset[name="${NAME.CAR_NAME}-fieldset"]`,
    RACING_COUNT: `fieldset[name="${NAME.RACING_COUNT}-fieldset"]`,
  },
  INPUT: {
    CAR_NAME: `input[name="${NAME.CAR_NAME}-input"]`,
    RACING_COUNT: `input[name="${NAME.RACING_COUNT}-input"]`,
  },
  ID: {
    RACE_FORM: '#race-form',
    RACE_PROCESS: '#race-process',
    RACE_RESULT: '#race-result',
  },
};
