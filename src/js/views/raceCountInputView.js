import { fieldSelector } from '../constant/selector.js'
import controller from '../controller.js'
import { $ } from '../utils.js'

const getRaceCountInputView = function () {
	return $(fieldSelector.RACE_COUNT_FIELD).cloneNode(true)
}

const renderRaceCountInputView = function (newNode) {
	$(fieldSelector.RACE_COUNT_FIELD).replaceWith(newNode)
}

const init = function () {
	const $raceCountInput = getRaceCountInputView()
	$raceCountInput.hidden = false
	$raceCountInput.addEventListener('keydown', controller.handleRaceCountInput)
	renderRaceCountInputView($raceCountInput)
}

export default init
