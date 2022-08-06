import { State } from './index.js'

const racingGameStore = Object.freeze({
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
	isRaceStarted: new State(false),
})

export default racingGameStore
