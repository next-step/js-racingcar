import { fieldSelector } from './constant/selector.js'
import { createCars } from './models/createCars.js'
import { State } from './models/State.js'
import validator from './validator.js'
import { toggleRaceCountInputView } from './views/raceCountInputView.js'
import { $ } from './utils.js'
import { errorMessage } from './constant/message.js'
import { renderCarList } from './views/carsView.js'

const state = Object.freeze({
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
})

const subscribeViews = (() => {
	state.cars.subscribe(() => toggleRaceCountInputView(state.cars.getState()))
	state.raceCount.subscribe(() =>
		renderCarList({ cars: state.cars.getState() })
	)
})()

const completeFieldsetElement = function ({
	fieldsetElement,
	saveValue,
	stateKey,
}) {
	try {
		if (!saveValue) {
			throw new Error(errorMessage.INVALID_SAVE_VALUE)
		}
		if (!fieldsetElement) {
			throw new Error(errorMessage.INVALID_FIELDSET_ELEMENT)
		} else {
			fieldsetElement.disabled = true
			state[stateKey].setState(saveValue)
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
			saveValue: cars,
			stateKey: 'cars',
		})
	}
}

const handleClickCarNameSubmitButton = function (carNameInputValue) {
	const cars = createCars(carNameInputValue)
	completeFieldsetElement({
		fieldsetElement: $(fieldSelector.CAR_NAME_FIELD),
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
