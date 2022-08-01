import { buttonSelector, inputSelector } from './constant/selector.js'
import controller from './controller.js'
import { $ } from './utils.js'

function main() {
	const $carNameInput = $(inputSelector.INPUT_CAR_NAME)
	const $carNameSubmitButton = $(buttonSelector.SUBMIT_CAR_NAME)
	const $raceCountInput = $(inputSelector.INPUT_RACE_COUNT)
	const $raceCountSubmitButton = $(buttonSelector.SUBMIT_RACE_COUNT)

	$carNameInput.addEventListener('keydown', controller.handleCarNameInput)
	$carNameSubmitButton.addEventListener('click', () =>
		controller.handleClickCarNameSubmitButton($carNameInput.value)
	)

	$raceCountInput.addEventListener('keydown', controller.handleRaceCountInput)
	$raceCountSubmitButton.addEventListener('click', () =>
		controller.handleClickRaceCountSubmitButton($raceCountInput)
	)
}

main()
