export const NAME = {
 CAR_NAME: 'car-name',
 RACING_COUNT: 'racing-count',
};

export const SELECTOR = {
 FIELDSET: {
  CAR_NAME: `fieldset[name="${NAME.CAR_NAME}"]`,
  RACING_COUNT: `fieldset[name="${NAME.RACING_COUNT}"]`,
 },
 INPUT: {
  CAR_NAME: `input[name="${NAME.CAR_NAME}"]`,
  RACING_COUNT: `input[name="${NAME.RACING_COUNT}"]`,
 },
 ID: {
  RACE_FORM: '#race-form',
  RACE_PROCESS: '#race-process',
  RACE_RESULT: '#race-result',
 },
};
