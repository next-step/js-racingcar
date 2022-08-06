import { fieldsetSelector, inputSelector } from './constant/selector.js'
import { $, showElement } from './utils.js'
import {
	createCars,
	racingGameStore,
	saveFieldsetValue,
} from './models/index.js'
import {
	carsView,
	fieldsetView,
	trackView,
	winnersView,
} from './views/index.js'
import { eventType } from './constant/eventType.js'
import createValidRaceCount from './models/createValidRaceCount.js'

const saveCarNameInput = function (ev) {
	if (ev.key === eventType.ENTER) {
		racingGameStore.carNameInput.setState(ev.target.value)
		return
	}
	if (ev.type === eventType.CLICK) {
		racingGameStore.carNameInput.setState($(inputSelector.INPUT_CAR_NAME).value)
		return
	}
}

const saveCars = function () {
	const { carNameInput, cars } = racingGameStore
	const carList = createCars(carNameInput.getState())

	!!carList.length && cars.setState(carList)
	fieldsetView.freezeFieldset($(fieldsetSelector.CAR_NAME_FIELD))
}

const handleRaceCountInput = function (ev) {
	const { target, key } = ev
	if (key === eventType.ENTER) {
		const raceCount = createValidRaceCount(target.valueAsNumber)

		!!raceCount &&
			saveFieldsetValue({
				fieldsetSelector: $(fieldsetSelector.RACE_COUNT_FIELD),
				saveValue: raceCount,
				stateKey: 'raceCount',
			})
	}
}

const handleClickRaceCountSubmitButton = function (raceCountInput) {
	const raceCount = createValidRaceCount(raceCountInput.valueAsNumber)

	!!raceCount &&
		saveFieldsetValue({
			fieldsetSelector: $(fieldsetSelector.RACE_COUNT_FIELD),
			saveValue: raceCount,
			stateKey: 'raceCount',
		})
}

const initGame = function () {
	racingGameStore.isRaceStarted.setState(true)
}

const runGame = function () {
	const { cars, raceCount } = racingGameStore
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

	racingGameStore.winners.setState(winners)
}

const subscribeViews = (() => {
	const { carNameInput, cars, raceCount, isRaceStarted, winners } =
		racingGameStore
	carNameInput.subscribe(saveCars)
	cars.subscribe(() => {
		fieldsetView.showFieldset($(fieldsetSelector.RACE_COUNT_FIELD))
	})
	raceCount.subscribe(() => {
		carsView.renderCarList({ cars: cars.getState() })
		initGame()
	})
	isRaceStarted.subscribe(runGame)
	winners.subscribe(() => {
		winnersView.renderWinners({ winners: winners.getState() })
	})
})()

export default {
	saveCarNameInput,
	handleRaceCountInput,
	handleClickRaceCountSubmitButton,
}
