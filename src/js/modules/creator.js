import CreateAction from '../Core/Redux/CreateAction.js'
import {
  GET_CARS,
  SET_GAME_COUNT,
  MOVE_CARS,
  DISPLAY_WINNERS,
  RESET_GAME,
  SET_MANUAL,
} from './actions.js'

const getCars = (cars) => CreateAction(GET_CARS, { cars })
const setGameCount = (count) => CreateAction(SET_GAME_COUNT, { count })
const moveCars = (randomInt) => CreateAction(MOVE_CARS, { randomInt })
const resetGame = () => CreateAction(RESET_GAME)
const displayWinners = (winners) => CreateAction(DISPLAY_WINNERS, { winners })
const setManual = () => CreateAction(SET_MANUAL)

export { getCars, setGameCount, moveCars, resetGame, displayWinners, setManual }
