import { createCars } from './model/createCars.js'
import { State } from './model/State.js'
import validator from './validator.js'

const state = Object.freeze({
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
	isRaceStarted: new State(false),
})

const saveCars = function (cars) {
	console.log(cars)
	state.cars.setState(cars)
}

const saveRaceCount = function (raceCount) {
	if (validator.validateRaceCount(raceCount)) {
		console.log(raceCount)
		state.raceCount.setState(raceCount)
	}
}

const handleCarNameInput = function (ev) {
	const { target, key } = ev
	if (key === 'Enter') {
		const cars = createCars(target.value)
		saveCars(cars)
	}
}

const handleClickCarNameSubmitButton = function (carNameInputValue) {
	const cars = createCars(carNameInputValue)
	saveCars(cars)
}

const handleRaceCountInput = function (ev) {
	const { target, key } = ev
	if (key === 'Enter') {
		const raceCount = target.valueAsNumber
		saveRaceCount(raceCount)
	}
}

const handleClickRaceCountSubmitButton = function (raceCountInput) {
	const raceCount = raceCountInput.valueAsNumber
	saveRaceCount(raceCount)
}

export default {
	state,
	handleCarNameInput,
	handleClickCarNameSubmitButton,
	handleRaceCountInput,
	handleClickRaceCountSubmitButton,
}
