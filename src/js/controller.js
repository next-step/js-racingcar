import { fieldSelector } from './constant/selector.js'
import { createCars } from './model/createCars.js'
import { State } from './model/State.js'
import validator from './validator.js'
import { toggleRaceCountInputView } from './views/raceCountInputView.js'
import { $ } from './utils.js'
import { errorMessage } from './constant/message.js'

const state = Object.freeze({
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
	isRaceStarted: new State(false),
})

const subscribeViews = (() => {
	state.cars.subscribe(() => toggleRaceCountInputView(state.cars.getState()))
})()

const saveCars = function (cars) {
	state.cars.setState(cars)
}

const saveRaceCount = function (raceCount) {
	state.raceCount.setState(raceCount)
}

const completeFieldsetElement = function ({
	fieldsetElement,
	saveFunction,
	saveValue,
	stateKey,
}) {
	try {
		if (!saveValue) {
			throw new Error(errorMessage.INVALID_SAVE_VALUE)
		}
		if (!saveFunction) {
			throw new Error(errorMessage.INVALID_SAVE_FUNCTION)
		}
		if (!fieldsetElement) {
			throw new Error(errorMessage.INVALID_FIELDSET_ELEMENT)
		} else {
			fieldsetElement.disabled = true
			saveFunction(saveValue)
			state[stateKey].freeze()
		}
	} catch (err) {
		console.error(err)
	}
}

const handleCarNameInput = function (ev) {
	const { target, key } = ev
	if (key === 'Enter') {
		const cars = createCars(target.value)

		completeFieldsetElement({
			fieldsetElement: $(fieldSelector.CAR_NAME_FIELD),
			saveFunction: saveCars,
			saveValue: cars,
			stateKey: 'cars',
		})
	}
}

const handleClickCarNameSubmitButton = function (carNameInputValue) {
	const cars = createCars(carNameInputValue)
	completeFieldsetElement({
		fieldsetElement: $(fieldSelector.CAR_NAME_FIELD),
		saveFunction: saveCars,
		saveValue: cars,
		stateKey: 'cars',
	})
}

const handleRaceCountInput = function (ev) {
	const { target, key } = ev
	if (key === 'Enter') {
		const raceCount = target.valueAsNumber

		if (validator.validateRaceCount(raceCount)) {
			completeFieldsetElement({
				fieldsetElement: $(fieldSelector.RACE_COUNT_FIELD),
				saveFunction: saveRaceCount,
				saveValue: raceCount,
				stateKey: 'raceCount',
			})
		}
	}
}

const handleClickRaceCountSubmitButton = function (raceCountInput) {
	const raceCount = raceCountInput.valueAsNumber

	if (validator.validateRaceCount(raceCount)) {
		completeFieldsetElement({
			fieldsetElement: $(fieldSelector.RACE_COUNT_FIELD),
			saveFunction: saveRaceCount,
			saveValue: raceCount,
			stateKey: 'raceCount',
		})
	}
}

export default {
	state,
	handleCarNameInput,
	handleClickCarNameSubmitButton,
	handleRaceCountInput,
	handleClickRaceCountSubmitButton,
}
