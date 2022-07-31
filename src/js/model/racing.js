import { sendCarsToView } from '../view-model/car.js'
import { racingGameStore } from './racing-game-store.js'
import { RACE_END_COUNT } from '../constant/number.js'

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
			if (car.isOkToGo()) {
				car.go()
			}
		})
		setCarTry(tryCount - 1)
		race()
	}
}
