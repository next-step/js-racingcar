// components/WinnerAnnouncement.js
import { createEl } from "../utils/createEl.js";

class WinnerAnnouncement {
	constructor({ $target, $initialState }) {
		this.$winnerAnnouncement = createEl("div", "winner-announcement");
		$target.appendChild(this.$winnerAnnouncement);

		this.state = $initialState || [];
		this.render();
	}

	generateHTML() {
		if (this.state.length === 0) {
			return `
        <p></p>
      `;
		}

		const winnerNames = this.state.map((winner) => winner.name).join(", ");

		return `
      <p>우승자: ${winnerNames}</p>
    `;
	}

	render() {
		this.$winnerAnnouncement.innerHTML = this.generateHTML();
		this.$winnerAnnouncement.style.display =
			this.state.length > 0 ? "block" : "none";
	}

	setState({ nextState }) {
		this.state = nextState;
		this.render();
	}
}

export default WinnerAnnouncement;
