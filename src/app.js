import createStore from "../src/store/store.js";
import carReducer from "../src/reducers/carReducer.js";
import { setCarNames, setRound } from "../src/actions/carActions.js";
import ValidateInput from "./domain/ValidateInput.js";
import CarRacingGame from "./domain/CarRacingGame.js";
import { createEl } from "./utils/createEl.js";
import Car from "./domain/Car.js";
import RaceTrack from "./view/RaceTrack.js";
import InputContainer from "./view/InputContainer.js";
import WinnerAnnouncement from "./view/WinnerAnnouncement.js";
import { SETTING } from "./constants/setting.js";

class App {
	constructor($target) {
		this.$app = createEl("div", "app");
		$target.appendChild(this.$app);

		this.store = createStore(carReducer, {
			carNames: [],
			round: 0,
			raceResult: [],
		});

		this.validateInput = new ValidateInput();

		this.render();

		this.inputContainer = new InputContainer({
			$target: this.$app,
			$onSubmit: (carNames, rounds) => {
				this.validateInput.isValidCarInput(carNames);
				this.validateInput.isValidRoundInput(rounds);

				const cars = carNames
					.split(SETTING.INPUT_SETTING.SPLITER)
					.map((carName) => new Car(carName));

				this.store.dispatch(setCarNames(cars));
				this.store.dispatch(setRound(rounds));
				this.startGame();
			},
		});

		this.raceTrack = new RaceTrack({
			$target: this.$app,
			$initialState: this.store.getState().carNames,
		});

		this.winnerAnnouncement = new WinnerAnnouncement({
			$target: this.$app,
			winners: [],
		});

		this.store.subscribe(() => {
			const state = this.store.getState();
			this.raceTrack.setState({ nextState: state.carNames });
			this.winnerAnnouncement.setState({ nextState: state.raceResult });
		});
	}

	startGame() {
		this.raceTrack.reset();
		const carRacingGame = new CarRacingGame(this.store);
		carRacingGame.progressGame();
	}

	generateHTML() {
		return `
			<h1>🏎️ 자동차 경주 게임 🏎️</h1>
		`;
	}

	render() {
		this.$app.insertAdjacentHTML("beforeend", this.generateHTML());
	}
}

export default App;
