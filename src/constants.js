export const ACTION = Object.freeze({
  UPDATE_CAR_NAME: 'updateCarName',
  UPDATE_TRY_COUNT: 'updateTryCount',
  RACING: 'racing',
  SHOW_WINNER: 'showWinner',
  RESET_RACING: 'resetRacing',
})

export const initStateValue = {
  carNames: [],
  carTryCount: 0,
  carRacing: {},
  winners: [],
}
