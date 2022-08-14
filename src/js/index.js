import {
	buttonSelector,
	formSelector,
	inputSelector,
} from './constant/selector.js'
import controller from './controller.js'
import { $ } from './utils.js'

function main() {
	const raceGameFormElement = $(formSelector.RACE_GAME_FORM)
	const carNameInputElement = $(inputSelector.INPUT_CAR_NAME)
	const carNameSubmitButtonElement = $(buttonSelector.SUBMIT_CAR_NAME)
	const raceCountInputElement = $(inputSelector.INPUT_RACE_COUNT)
	const raceCountSubmitButtonElement = $(buttonSelector.SUBMIT_RACE_COUNT)

	raceGameFormElement.addEventListener('submit', controller.startGame)
	carNameInputElement.addEventListener('keydown', controller.saveCarNameInput)
	carNameSubmitButtonElement.addEventListener(
		'click',
		controller.saveCarNameInput
	)

	raceCountInputElement.addEventListener(
		'keydown',
		controller.saveRaceCountInput
	)
	raceCountSubmitButtonElement.addEventListener(
		'click',
		controller.saveRaceCountInput
	)
}

main()
