import {
	fieldsetSelector,
	formSelector,
	inputSelector,
} from './constant/selector.js'
import { $ } from './utils.js'
import { createValidCars, racingGameStore } from './models/index.js'
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
	const carList = createValidCars(carNameInput.getState())

	if (!!carList.length) {
		cars.setState(carList)
		fieldsetView.freezeFieldset($(fieldsetSelector.CAR_NAME_FIELD))
	}
}

const saveRaceCountInput = function (ev) {
	if (ev.key === eventType.ENTER) {
		racingGameStore.raceCountInput.setState(ev.target.valueAsNumber)
		return
	}

	if (ev.type === eventType.CLICK) {
		racingGameStore.raceCountInput.setState(
			$(inputSelector.INPUT_RACE_COUNT).valueAsNumber
		)
		return
	}
}

const saveRaceCount = function () {
	const { raceCountInput, raceCount } = racingGameStore
	const validRaceCount = createValidRaceCount(raceCountInput.getState())

	if (!!validRaceCount) {
		raceCount.setState(validRaceCount)
		fieldsetView.freezeFieldset($(fieldsetSelector.RACE_COUNT_FIELD))
	}
}

const startGame = function (ev) {
	ev.preventDefault()

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
	const {
		carNameInput,
		cars,
		raceCountInput,
		raceCount,
		isRaceStarted,
		winners,
	} = racingGameStore

	carNameInput.subscribe(saveCars)
	cars.subscribe(() => {
		fieldsetView.showFieldset($(fieldsetSelector.RACE_COUNT_FIELD))
	})
	raceCountInput.subscribe(saveRaceCount)
	raceCount.subscribe(() => {
		carsView.renderCarList({ cars: cars.getState() })
		$(formSelector.RACE_GAME_FORM).requestSubmit()
	})
	isRaceStarted.subscribe(runGame)
	winners.subscribe(() => {
		winnersView.renderWinners({ winners: winners.getState() })
	})
})()

export default {
	startGame,
	saveCarNameInput,
	saveRaceCountInput,
}
