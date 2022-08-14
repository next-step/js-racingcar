import { State } from './index.js'

const racingGameStore = Object.freeze({
	carNameInput: new State(''),
	raceCountInput: new State(null),
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
	isRaceStarted: new State(false),
})

export default racingGameStore
