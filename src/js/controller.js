import {
	fieldsetSelector,
	formSelector,
	inputSelector,
} from './constant/selector.js'
import { $, showElement } from './utils.js'
import {
	createValidCars,
	racingGameStore,
	createValidRaceCount,
} from './models/index.js'
import {
	carsView,
	fieldsetView,
	trackView,
	winnersView,
} from './views/index.js'
import { eventType } from './constant/eventType.js'

const saveCarNameInput = function (ev) {
	const { carNameInput } = racingGameStore

	if (ev.key === eventType.ENTER) {
		carNameInput.setState(ev.target.value)
		return
	}
	if (ev.type === eventType.CLICK) {
		carNameInput.setState($(inputSelector.INPUT_CAR_NAME).value)
		return
	}
}

const saveCars = function () {
	const { carNameInput } = racingGameStore
	const carList = createValidCars(carNameInput.getState())

	if (!!carList.length) {
		fieldsetView.freezeFieldset($(fieldsetSelector.CAR_NAME_FIELD))
		setStateAndFreeze({ stateKey: 'cars', newState: carList })
	}
}

const saveRaceCountInput = function (ev) {
	const { raceCountInput } = racingGameStore

	if (ev.key === eventType.ENTER) {
		raceCountInput.setState(ev.target.valueAsNumber)
		return
	}

	if (ev.type === eventType.CLICK) {
		raceCountInput.setState($(inputSelector.INPUT_RACE_COUNT).valueAsNumber)
		return
	}
}

const saveRaceCount = function () {
	const { raceCountInput } = racingGameStore
	const validRaceCount = createValidRaceCount(raceCountInput.getState())

	if (!!validRaceCount) {
		fieldsetView.freezeFieldset($(fieldsetSelector.RACE_COUNT_FIELD))
		setStateAndFreeze({ stateKey: 'raceCount', newState: validRaceCount })
	}
}

const startGame = function (ev) {
	ev.preventDefault()
	setStateAndFreeze({ stateKey: 'isRaceStarted', newState: true })
}

const runGame = async function () {
	const { cars, raceCount } = racingGameStore

	await trackView
		.initTrack({
			cars: cars.getState(),
			raceCount: raceCount.getState(),
		})
		.then(() => {
			setWinner({ cars: cars.getState() })
		})
}

const setWinner = function ({ cars }) {
	const winnerPosition = cars.reduce((maxPosition, { position }) => {
		return position > maxPosition ? position : maxPosition
	}, 0)

	const winners = cars.filter((car) => car.position === winnerPosition)
	setStateAndFreeze({ stateKey: 'winners', newState: winners })
}

const setStateAndFreeze = function ({ stateKey, newState }) {
	const stateObj = racingGameStore[stateKey]
	stateObj.setState(newState)
	stateObj.freeze()
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
		const raceCountFieldsetElement = $(fieldsetSelector.RACE_COUNT_FIELD)
		showElement(raceCountFieldsetElement)
		raceCountFieldsetElement.querySelector('input').focus()
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
