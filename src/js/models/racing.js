// import { racingGameStore } from './racing-game-store.js'
import { CAR_GO_OR_NOT_STANDARD, RACE_END_COUNT } from '../constant/number.js'
import { getRandomInt } from '../utils.js'
import controller from '../controller.js'

export const initRacing = function () {
	const { raceCount } = controller.state
	race(raceCount)
}

export const race = function (raceCount) {
	console.log(raceCount)
	// const { getCars, getCarTry, setCarTry } = racingGameStore
	// const tryCount = getCarTry()
	// const cars = getCars()

	// if (tryCount > RACE_END_COUNT) {
	// 	cars.forEach((car) => {
	// 		if (CAR_GO_OR_NOT_STANDARD > getRandomInt(0, 9)) {
	// 			car.go()
	// 		}
	// 	})
	// 	setCarTry(tryCount - 1)
	// 	race()
	// }
}
