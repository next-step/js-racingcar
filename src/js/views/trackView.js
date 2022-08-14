import { CAR_GO_OR_NOT_STANDARD, RACE_END_COUNT } from '../constant/number.js'
import { divSelector } from '../constant/selector.js'
import { $$, getRandomInt } from '../utils.js'

const getTrackElement = function () {
	const arrowElement = document.createElement('div')
	arrowElement.classList.add('forward-icon')
	arrowElement.textContent = '⬇️️'

	return arrowElement
}

const initTrack = async function ({ cars, raceCount }) {
	return new Promise((resolve) => {
		renderTrack({ cars, raceCount, resolve })
	})
}

const renderTrack = async function ({ cars, raceCount, resolve }) {
	if (raceCount <= RACE_END_COUNT) {
		$$(divSelector.SPINNER_CONTAINER).forEach((el) => (el.hidden = true))
		resolve()
		return
	}

	const trackListWrapperElement = $$('.racing-track')

	cars.forEach((car, idx) => {
		if (CAR_GO_OR_NOT_STANDARD > getRandomInt(0, 9)) {
			car.go()
			trackListWrapperElement[idx].append(getTrackElement())
		}
	})

	setTimeout(() => {
		renderTrack({ cars, raceCount: raceCount - 1, resolve })
	}, 1000)
}

export default {
	initTrack,
	renderTrack,
}
