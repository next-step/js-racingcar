import { createEl } from "../utils/createEl.js";

export default class RaceTrack {
	constructor({ $target, $initialState }) {
		this.$raceTrack = createEl("div", "race-track");
		this.state = $initialState || [];
		$target.appendChild(this.$raceTrack);
		this.render();
	}

	generateHTML(carName, position) {
		const progress = "-".repeat(position);

		return `
		<div class="car-player">
			<div class="car-player__name">${carName} : ${progress}</div>
		</div>
		`;
	}

	reset() {
		this.$raceTrack.innerHTML = "";
	}

	render() {
		this.$raceTrack.innerHTML +=
			this.state
				.map(({ name, position }) => this.generateHTML(name, position))
				.join("") + "<br>";
	}

	setState({ nextState }) {
		this.state = nextState;
		this.render();
	}

	addEventListener(eventName, handler) {
		this.$raceTrack.addEventListener(eventName, handler);
	}
}
