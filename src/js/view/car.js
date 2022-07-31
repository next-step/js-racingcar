import {
	divSelector,
	sectionSelector,
	spanSelector,
	ulSelector,
} from '../constant/selector.js'
import { $ } from '../utils.js'

export const paintCar = function (carsElement) {
	$(ulSelector.CAR_LIST).innerHTML = carsElement
}

export const showRaceSection = function () {
	$(sectionSelector.RACE_SECTION).classList.remove('d-none')
}

export const getCarComponent = function (name, position) {
	const carWrapper = document.createElement('div')
	carWrapper.id = divSelector.CAR_WRAPPER.slice(1)
	carWrapper.classList.add('mr-2')

	const carName = document.createElement('div')
	carName.classList.add(spanSelector.CAR_NAME.slice(1))
	carName.innerText = name

	carWrapper.appendChild(carName)
	carWrapper.appendChild(generateArrowComponents(position))

	return carWrapper
}

export const getArrowComponent = function () {
	const arrowElement = document.createElement('div')
	arrowElement.classList.add('forward-icon')
	arrowElement.innerText = '⬇️️'

	return arrowElement
}

export const generateArrowComponents = function (arrowCount) {
	const div = document.createElement('div')
	div.innerHTML = Array(arrowCount)
		.fill()
		.reduce((acc) => {
			return acc + getArrowComponent().outerHTML
		}, '')
	return div
}
