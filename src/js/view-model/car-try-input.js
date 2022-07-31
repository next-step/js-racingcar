import { freezeCarTryView } from '../view/car-try-input.js'
import { racingGameStore } from '../model/racing-game-store.js'
import { initRacing } from '../model/racing.js'
import validate from '../validate.js'

export const handleCarTryInput = function (carTryInput) {
	if (validate.validateCompetitionCount(carTryInput)) {
		freezeCarTryView()
		racingGameStore.setCarTry(carTryInput)
		initRacing()
	}
}
