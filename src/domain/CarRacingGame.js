import { SETTING } from "../constants/setting.js";
import { setRaceResult, setCarNames } from "../actions/carActions.js";
import { getRandomValue } from "../utils/getRandomValue.js";

class CarRacingGame {
	constructor(store) {
		this.store = store;
		this.roundCount = 0;
		this.roundEnd = store.getState().round;
		this.cars = store.getState().carNames;
	}
	get getWinner() {
		const maxPosition = this.cars.reduce(
			(max, { position }) => (max > position ? max : position),
			0
		);
		const winners = this.cars.filter(
			({ position }) => position === maxPosition
		);
		return winners;
	}

	progressGame() {
		while (this.roundCount < this.roundEnd - 1) {
			const state = this.store.getState();
			const carNames = state.carNames;

			carNames.forEach((carName) => {
				carName.move(getRandomValue(0, 9));
			});

			this.increaseRound();
			this.store.dispatch(setCarNames(carNames));
		}

		this.endGame();
	}

	increaseRound() {
		this.roundCount++;
		if (this.roundCount === this.roundEnd) {
			this.endGame();
		}
	}
	endGame() {
		this.store.dispatch(setRaceResult(this.getWinner));
	}
}

export default CarRacingGame;
