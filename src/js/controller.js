import { createCars } from './model/createCars.js'

const state = {
	cars: [],
	raceCount: null,
	winners: [],
}

const saveCars = function (cars) {
	state.cars = cars
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
	}
}

export default {
	handleCarNameInput,
	handleClickCarNameSubmitButton,
	handleRaceCountInput,
}
