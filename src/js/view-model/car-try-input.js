import { freezeCarTryView } from '../view/car-try-input.js'
import { racingGameStore } from '../model/racing-game-store.js'
import { validateCarTry } from '../validate/car-try.js'
import { initRacing } from '../model/racing.js'

export const handleCarTryInput = function (carTryInput) {
	if (validateCarTry(carTryInput)) {
		freezeCarTryView()
		racingGameStore.setCarTry(carTryInput)
		initRacing()
	}
}
