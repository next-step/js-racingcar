import { fieldSelector } from '../constant/selector.js'
import { $ } from '../utils.js'

export const freezeCarNameInputView = function () {
	$(fieldSelector.CAR_NAME_FIELD).disabled = true
}
