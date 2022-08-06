import { CAR_GO_OR_NOT_STANDARD, RACE_END_COUNT } from '../constant/number.js'
import { getRandomInt } from '../utils.js'

const getTrackElement = function () {
	const arrowElement = document.createElement('div')
	arrowElement.classList.add('forward-icon')
	arrowElement.textContent = '⬇️️'

	return arrowElement
}

const renderTrack = function ({ cars, raceCount }) {
	if (raceCount <= RACE_END_COUNT) return

	const trackListWrapperElement = document.querySelectorAll('.racing-track')

	cars.forEach((car, idx) => {
		if (CAR_GO_OR_NOT_STANDARD > getRandomInt(0, 9)) {
			car.go()
			trackListWrapperElement[idx].append(getTrackElement())
		}
	})

	renderTrack({ cars, raceCount: raceCount - 1 })
}

export default {
	renderTrack,
}
