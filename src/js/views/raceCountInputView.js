import { fieldSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

export const toggleRaceCountInputView = function (cars) {
	$(fieldSelector.RACE_COUNT_FIELD).hidden = !cars
}
