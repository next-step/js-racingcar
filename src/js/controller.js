import { fieldSelector } from './constant/selector.js'
import validator from './validator.js'
import { $ } from './utils.js'
import { errorMessage } from './constant/message.js'
import { createCars, State } from './models/index.js'
import { carsView, trackView, winnersView } from './views/index.js'
import { userInteractionType } from './constant/interaction.js'

const state = Object.freeze({
	cars: new State([]),
	raceCount: new State(null),
	winners: new State([]),
	isRaceStarted: new State(false),
})

const completeFieldsetElement = function ({
	fieldsetElement,
	saveValue,
	stateKey,
}) {
	try {
		if (!saveValue) {
			throw new Error(errorMessage.INVALID_SAVE_VALUE)
		}
		if (!fieldsetElement) {
			throw new Error(errorMessage.INVALID_FIELDSET_ELEMENT)
		} else {
			fieldsetElement.disabled = true
			state[stateKey].setState(saveValue)
			state[stateKey].freeze()
		}
	} catch (err) {
		console.error(err)
	}
}

const handleCarNameInput = function (ev) {
	const { target, key } = ev
	if (key === userInteractionType.ENTER) {
		const cars = createCars(target.value)

		completeFieldsetElement({
			fieldsetElement: $(fieldSelector.CAR_NAME_FIELD),
			saveValue: cars,
			stateKey: 'cars',
		})
	}
}

const handleClickCarNameSubmitButton = function (carNameInputValue) {
	const cars = createCars(carNameInputValue)
	completeFieldsetElement({
		fieldsetElement: $(fieldSelector.CAR_NAME_FIELD),
		saveValue: cars,
		stateKey: 'cars',
	})
}

const handleRaceCountInput = function (ev) {
	const { target, key } = ev
	if (key === userInteractionType.ENTER) {
		const raceCount = target.valueAsNumber

		if (validator.validateRaceCount(raceCount)) {
			completeFieldsetElement({
				fieldsetElement: $(fieldSelector.RACE_COUNT_FIELD),
				saveValue: raceCount,
				stateKey: 'raceCount',
			})
		}
	}
}

const handleClickRaceCountSubmitButton = function (raceCountInput) {
	const raceCount = raceCountInput.valueAsNumber

	if (validator.validateRaceCount(raceCount)) {
		completeFieldsetElement({
			fieldsetElement: $(fieldSelector.RACE_COUNT_FIELD),
			saveValue: raceCount,
			stateKey: 'raceCount',
		})
	}
}

const initGame = function () {
	state.isRaceStarted.setState(true)
}

const runGame = function () {
	const { cars, raceCount } = state
	trackView.renderTrack({
		cars: cars.getState(),
		raceCount: raceCount.getState(),
	})
	setWinner({ cars: cars.getState() })
}

const setWinner = function ({ cars }) {
	const winnerPosition = cars.reduce((maxPosition, { position }) => {
		return position > maxPosition ? position : maxPosition
	}, 0)
	const winners = cars.filter((car) => car.position === winnerPosition)

	state.winners.setState(winners)
}

const subscribeViews = (() => {
	state.cars.subscribe(() => {
		$(fieldSelector.RACE_COUNT_FIELD).hidden = false
	})
	state.raceCount.subscribe(() => {
		carsView.renderCarList({ cars: state.cars.getState() })
		initGame()
	})
	state.isRaceStarted.subscribe(runGame)
	state.winners.subscribe(() => {
		winnersView.renderWinners({ winners: state.winners.getState() })
	})
})()

export default {
	state,
	handleCarNameInput,
	handleClickCarNameSubmitButton,
	handleRaceCountInput,
	handleClickRaceCountSubmitButton,
}
