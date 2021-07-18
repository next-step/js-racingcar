import CreateAction from '../Core/Redux/CreateAction.js'
import {
  GET_CARS,
  SET_GAME_COUNT,
  MOVE_CARS,
  DISPLAY_WINNERS,
  RESET_GAME,
} from './actions.js'

const getCars = (cars) => CreateAction(GET_CARS, { cars })
const setGameCount = (count) => CreateAction(SET_GAME_COUNT, { count })
const moveCars = () => CreateAction(MOVE_CARS)
const resetGame = () => CreateAction(RESET_GAME)
const displayWinners = (winners) => CreateAction(DISPLAY_WINNERS, { winners })

export { getCars, setGameCount, moveCars, resetGame, displayWinners }
