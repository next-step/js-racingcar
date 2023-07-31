import { SETTING } from "./constants/setting.js";
import { setRaceResult, setCarNames } from "./actions/carActions.js";
import { getRandomValue } from "./utils/getRandomValue.js";

class CarRacingGame {
	constructor(store) {
		this.store = store;
		this.gameCount = 0;
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
		while (this.gameCount < SETTING.CAR_RACING_GAME_SETTING.ROUND_END) {
			const state = this.store.getState();
			const carNames = state.carNames;

			carNames.forEach((carName) => {
				carName.move(getRandomValue(0, 9));
			});

			this.increaseRound();
			this.store.dispatch(setCarNames(carNames));
		}
	}

	increaseRound() {
		this.gameCount++;
		if (this.gameCount === SETTING.CAR_RACING_GAME_SETTING.ROUND_END) {
			this.endGame();
		}
	}
	endGame() {
		this.store.dispatch(setRaceResult(this.getWinner));
	}
}

export default CarRacingGame;
