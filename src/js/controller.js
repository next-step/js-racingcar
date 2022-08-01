import { createCars } from './model/createCars.js'
import { State } from './model/State.js'

const state = {
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
}

const saveCars = function (cars) {
	console.log(cars)
	state.cars.setState(cars)
}

const saveRaceCount = function (raceCount) {
	state.raceCount.setState(raceCount)
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
