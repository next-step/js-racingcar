import {
	buttonSelector,
	fieldSelector,
	inputSelector,
} from '../constant/selector.js'
import controller from '../controller.js'
import { $ } from '../utils.js'

const toggleRaceCountInputView = function (cars) {
	const raceCountField = $(fieldSelector.RACE_COUNT_FIELD)
	if (cars) {
		raceCountField.hidden = false
	} else {
		raceCountField.hidden = true
	}
}

const init = function () {
	controller.state.cars.subscribe(() =>
		toggleRaceCountInputView(controller.state.cars.getState())
	)
	const $raceCountInput = $(inputSelector.INPUT_RACE_COUNT)
	const $raceCountSubmitButton = $(buttonSelector.SUBMIT_RACE_COUNT)

	$raceCountInput.addEventListener('keydown', controller.handleRaceCountInput)
	$raceCountSubmitButton.addEventListener('click', () =>
		controller.handleClickRaceCountSubmitButton($raceCountInput)
	)
}

export default init
