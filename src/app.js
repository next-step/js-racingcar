import createStore from "../src/store/store.js";
import carReducer from "../src/reducers/carReducer.js";
import { setCarNames, setRaceResult } from "../src/actions/carActions.js";
import ValidateInput from "../src/ValidateInput.js";
import CarRacingGame from "../src/CarRacingGame.js";
import { SETTING } from "../src/constants/setting.js";
import Car from "./Car.js";
import RaceTrack from "./components/RaceTrack.js";

export default function App() {
	const store = createStore(carReducer, {
		carNames: [],
		raceResult: [],
	});

	function startGame() {
		const carRacingGame = new CarRacingGame(store);
		carRacingGame.progressGame();
	}

	function registerEvent() {
		const $carNameInput = document.getElementById("carNames");
		const $carNameSubmit = document.getElementById("startRace");

		$carNameSubmit.addEventListener("click", (e) => {
			e.preventDefault();

			const carNames = $carNameInput.value.split(",");
			const cars = carNames.map((carName) => new Car(carName));
			store.dispatch(setCarNames(cars));
			startGame();
		});
	}

	store.subscribe(() => {
		const state = store.getState();
		RaceTrack({ cars: state.carNames });
	});

	registerEvent();
}
