import { buttonSelector, inputSelector } from '../constant/selector.js'
import controller from '../controller.js'
import { $ } from '../utils.js'

const init = function () {
	const $carNameInput = $(inputSelector.INPUT_CAR_NAME)
	const $carNameSubmitButton = $(buttonSelector.SUBMIT_CAR_NAME)

	$carNameInput.addEventListener('keydown', controller.handleCarNameInput)
	$carNameSubmitButton.addEventListener('click', () =>
		controller.handleClickCarNameSubmitButton($carNameInput.value)
	)
}

export default init
