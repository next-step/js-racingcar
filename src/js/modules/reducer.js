import { getRandomInt } from '../utils/random.js'
import {
  DISPLAY_WINNERS,
  GET_CARS,
  MOVE_CARS,
  RESET_GAME,
  SET_GAME_COUNT,
  SET_MANUAL,
} from './actions.js'

const initialState = {
  cars: [],
  totalAttemps: 0,
  remainAttemps: 0,
  winners: [],
  manual: false,
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CARS:
      return {
        ...state,
        cars: [
          ...payload.cars.map((car) => {
            return { name: car, move: 0 }
          }),
        ],
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
        cars: state.cars.map((car) => {
          const newMove = payload.randomInt
            ? payload.randomInt < 4
              ? car.move
              : car.move + 1
            : getRandomInt() < 4
            ? car.move
            : car.move + 1
          return { name: car.name, move: newMove }
        }),
      }

    case DISPLAY_WINNERS:
      return {
        ...state,
        winners: payload.winners,
        remainAttemps: -1,
      }

    case RESET_GAME:
      return {
        cars: [],
        totalAttemps: 0,
        remainAttemps: 0,
        winners: [],
        manual: false,
      }

    case SET_MANUAL:
      return {
        ...state,
        manual: true,
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
