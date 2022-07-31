import { buttonSelector, inputSelector } from '../constant/selector.js'
import controller from '../controller.js'
import { $ } from '../utils.js'

const getCarNameInputElement = function () {
	return $(inputSelector.INPUT_CAR_NAME).cloneNode(true)
}

const renderCarNameInputElement = function (newNode) {
	$(inputSelector.INPUT_CAR_NAME).replaceWith(newNode)
}

const init = function () {
	const $carNameInput = getCarNameInputElement()
	const $carNameSubmitButton = $(buttonSelector.SUBMIT_CAR_NAME)

	$carNameInput.addEventListener('keydown', controller.handleCarNameInput)

	$carNameSubmitButton.addEventListener('click', () =>
		controller.handleClickCarNameSubmitButton($carNameInput.value)
	)

	renderCarNameInputElement($carNameInput)
}

export default init
