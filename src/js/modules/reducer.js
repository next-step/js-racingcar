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

function getRandomInt() {
  return Math.floor(Math.random() * 9)
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
          const newMove = getRandomInt() < 4 ? car.move : car.move + 1
          console.log(newMove)
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
      }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
