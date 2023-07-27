import createStore from "../src/store/store.js";
import carReducer from "../src/reducers/carReducer.js";
import { setCarNames, setRaceResult } from "../src/actions/carActions.js";
import ValidateInput from "../src/ValidateInput.js";
import CarRacingGame from "../src/CarRacingGame.js";
import { SETTING } from "../src/constants/setting.js";

export default function App() {
	const store = createStore(carReducer, {
		carNames: [],
		raceResult: [],
	});

	this.getRandomNumber = () => {
		return Math.floor(Math.random() * 10);
	};

	this.startGame = () => {
		for (
			let round = 0;
			round < SETTING.CAR_RACING_GAME_SETTING.ROUND_END;
			round++
		) {
			const state = store.getState();
			const carNames = state.carNames;

			carNames.forEach((carName) => {
				carName.move(getRandomNumber());
			});

			store.dispatch(setRaceResult(carNames));
		}
	};
}
