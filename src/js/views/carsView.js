import {
	spanSelector,
	templateSelector,
	ulSelector,
} from '../constant/selector.js'
import { $ } from '../utils.js'

export const renderCarList = function ({ cars }) {
	const carListElement = $(ulSelector.CAR_LIST)
	carListElement.hidden = false

	carListElement.innerHTML = cars.reduce(
		(acc, { name, position }) =>
			acc + getCarElement({ name, position }).outerHTML,
		''
	)
}

const createCarElement = function () {
	const carElementTemplate = $(templateSelector.CAR)
	return carElementTemplate.content.firstElementChild.cloneNode(true)
}

const getCarElement = function ({ name }) {
	const carElement = createCarElement()
	carElement.querySelector(spanSelector.CAR_NAME).textContent = name

	return carElement
}
