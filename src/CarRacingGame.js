import { SETTING } from "./constants/setting.js";
import { setRaceResult, setCarNames } from "./actions/carActions.js";

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

	get getRandomValue() {
		return Math.floor(Math.random() * 10);
	}

	progressGame() {
		while (this.gameCount < SETTING.CAR_RACING_GAME_SETTING.ROUND_END) {
			const state = this.store.getState();
			const carNames = state.carNames;

			carNames.forEach((carName) => {
				carName.move(this.getRandomValue);
			});

			this.increaseGame();
			this.store.dispatch(setCarNames(carNames));
		}
	}

	increaseGame() {
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
