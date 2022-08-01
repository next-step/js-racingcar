import { fieldSelector } from '../constant/selector.js'
import { Car } from '../model/Car.js'
import { racingGameStore } from '../model/racing-game-store.js'
import { $, showElement } from '../utils.js'
import validator from '../validator.js'
import { freezeCarNameView } from '../view/car-name-input.js'
import { focusOnTryInput } from '../view/car-try-input.js'

const parseCarNames = function (carNameInput) {
	return carNameInput.split(',').map((carName) => carName.trim())
}

export const handleCarNameInput = function (carNameInput) {
	const carNames = parseCarNames(carNameInput)

	if (carNames.every((carName) => validator.validateCarName(carName))) {
		const cars = carNames.map((name) => new Car(name))
		racingGameStore.setCars(cars)

		freezeCarNameView()
		showElement($(fieldSelector.COMPETITION_COUNT_FIELD))
		focusOnTryInput()
	}
}
