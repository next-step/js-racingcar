import { fieldSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

export const toggleRaceCountInputView = function (cars) {
	const raceCountField = $(fieldSelector.RACE_COUNT_FIELD)
	if (cars) {
		raceCountField.hidden = false
	} else {
		raceCountField.hidden = true
	}
}
