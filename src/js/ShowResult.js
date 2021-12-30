import { showWinnersTemplate } from "./utils/templates.js";

export default class ShowResult {
	constructor({ initialWinners, $winners, $showResult, $resultReset }) {
		this.initialWinners = initialWinners;
		this.$winners = $winners;
		this.$showResult = $showResult;
		this.$resultReset = $resultReset;

		document.querySelector(".show-process").addEventListener("load", () => {
			const countMoveArray = [
				...document.querySelectorAll(".car-player-container"),
			].map((element) => element.childElementCount);
			console.log(countMoveArray);
		});
		this.$resultReset.addEventListener("click", () => location.reload());
	}

	render() {
		this.$winners.textContent = showWinnersTemplate(this.initialWinners);
		this.$showResult.classList.remove("hidden");
	}

	setState(nextWinners) {
		this.initialWinners = nextWinners;
		this.render();
		setTimeout(
			() =>
				alert(
					"최종 우승자는 " +
						this.initialWinners.join(", ") +
						"입니다. 축하합니다!!"
				),
			2000
		);
	}
}
