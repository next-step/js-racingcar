import {
  DISPLAY_WINNERS,
  GET_CARS,
  MOVE_CARS,
  RESET_GAME,
  SET_GAME_COUNT,
} from './actions.js'

const initialState = {
  cars: [],
  totalAttemps: 0,
  remainAttemps: 0,
  winners: [],
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CARS:
      return {
        ...state,
        cars: [...payload.cars],
      }

    case SET_GAME_COUNT:
      return {
        ...state,
        totalAttemps: payload.count,
        remainAttemps: payload.count,
      }

    case MOVE_CARS:
      return {
        ...state,
        remainAttemps: state.remainAttemps - 1,
      }

    case RESET_GAME:
      return {
        cars: [],
        totalAttemps: 0,
        remainAttemps: 0,
        winners: [],
      }

    case DISPLAY_WINNERS:
      return {
        ...state,
        winners: payload.winners,
      }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
