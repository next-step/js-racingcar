import { sendCarsToView } from '../view-model/car.js'
import { racingGameStore } from './racing-game-store.js'
import { CAR_GO_OR_NOT_STANDARD, RACE_END_COUNT } from '../constant/number.js'
import { getRandomInt } from '../utils.js'

export const initRacing = function () {
	const { getCars } = racingGameStore
	race()
	sendCarsToView(getCars())
}

export const race = function () {
	const { getCars, getCarTry, setCarTry } = racingGameStore
	const tryCount = getCarTry()
	const cars = getCars()

	if (tryCount > RACE_END_COUNT) {
		cars.forEach((car) => {
			if (CAR_GO_OR_NOT_STANDARD > getRandomInt(0, 9)) {
				car.go()
			}
		})
		setCarTry(tryCount - 1)
		race()
	}
}
