import { generateCars } from '../model/make-car.js'
import { racingGameStore } from '../model/racing-game-store.js'
import validate from '../validate.js'
import { freezeCarNameView } from '../view/car-name-input.js'
import { focusOnTryInput, showCarTryInput } from '../view/car-try-input.js'

export const handleCarNameInput = function (carNameInput) {
	const carNames = carNameInput.split(',').map((carName) => carName.trim())
	if (carNames.every((carName) => validate.validateCarName(carName))) {
		racingGameStore.setCars(generateCars(carNames))
		freezeCarNameView()
		showCarTryInput()
		focusOnTryInput()
	}
}
