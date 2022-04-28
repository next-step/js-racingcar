export default class RacingResultView {
	constructor({ $target, $winner }) {
		this.$target = $target;
		this.$winner = $winner;
	}

	#getWinner() {
		const $racingGameColumns = Array.from(
			document.querySelectorAll('.racing-game')
		);

		const maxNum = Math.max(
			...$racingGameColumns.map((item) => item.childElementCount)
		);

		const winner = $racingGameColumns
			.filter((item) => item.childElementCount === maxNum)
			.map((item) => item.querySelector('.car-player').innerText);

		return winner;
	}

	createWinUserTemplate = () => {
		this.$target.style.display = 'flex';
		this.$winner.innerText = this.#getWinner().join(', ');
	};
}
