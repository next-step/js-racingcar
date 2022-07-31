import { $ } from '../utils.js'
import { buttonSelector, inputSelector } from '../constant/selector.js'
import { handleCarTryInput } from '../view-model/car-try-input.js'

export const addCarTryEvent = function () {
	const $carTryInput = $(inputSelector.INPUT_CAR_TRY)
	const $carTrySubmit = $(buttonSelector.SUBMIT_CAR_TRY)

	$carTrySubmit.addEventListener('click', () => {
		handleCarTryInput($carTryInput.valueAsNumber)
	})
	$carTryInput.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') {
			handleCarTryInput($carTryInput.valueAsNumber)
		}
	})
}

export const freezeCarTryView = function () {
	$(inputSelector.INPUT_CAR_TRY).disabled = true
	$(buttonSelector.SUBMIT_CAR_TRY).disabled = true
}

export const focusOnTryInput = function () {
	$(inputSelector.INPUT_CAR_TRY).focus()
}
