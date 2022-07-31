import {
	buttonSelector,
	fieldSelector,
	inputSelector,
} from '../constant/selector.js'
import controller from '../controller.js'
import { $ } from '../utils.js'

const init = function () {
	const $raceCountInput = $(inputSelector.INPUT_RACE_COUNT)
	const $raceCountSubmitButton = $(buttonSelector.SUBMIT_RACE_COUNT)

	$raceCountInput.addEventListener('keydown', controller.handleRaceCountInput)

	$raceCountSubmitButton.addEventListener(
		'click',
		controller.handleClickRaceCountSubmitButton
	)
}

export default init
