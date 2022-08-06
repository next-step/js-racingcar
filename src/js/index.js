import { buttonSelector, inputSelector } from './constant/selector.js'
import controller from './controller.js'
import { $ } from './utils.js'

function main() {
	const $carNameInput = $(inputSelector.INPUT_CAR_NAME)
	const $carNameSubmitButton = $(buttonSelector.SUBMIT_CAR_NAME)
	const $raceCountInput = $(inputSelector.INPUT_RACE_COUNT)
	const $raceCountSubmitButton = $(buttonSelector.SUBMIT_RACE_COUNT)

	$carNameInput.addEventListener('keydown', controller.saveCarNameInput)
	$carNameSubmitButton.addEventListener('click', controller.saveCarNameInput)

	$raceCountInput.addEventListener('keydown', controller.saveRaceCountInput)
	$raceCountSubmitButton.addEventListener(
		'click',
		controller.saveRaceCountInput
	)
}

main()
