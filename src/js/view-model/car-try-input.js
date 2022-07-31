import { freezeCarTryView } from '../view/car-try-input.js'
import { racingGameStore } from '../model/racing-game-store.js'
import { initRacing } from '../model/racing.js'
import validator from '../validator.js'

export const handleCarTryInput = function (carTryInput) {
	if (validator.validateCompetitionCount(carTryInput)) {
		freezeCarTryView()
		racingGameStore.setCarTry(carTryInput)
		initRacing()
	}
}
