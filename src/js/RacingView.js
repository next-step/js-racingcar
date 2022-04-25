export default class RacingView {
	constructor({ car, $target }) {
		if (!car || !$target) throw Error();

		this.car = car;
		this.$target = $target;
	}

	updateView(callback) {
		const template = this.#createForwardArrowTemplate();
		this.$target.style.display = 'flex';
		this.$target.innerHTML = `<div class="mt-4 d-flex">${template}</div>`;

		callback && callback();
	}

	#getRacingGameProcess() {
		return Array.from({ length: this.car.tryCount }, () =>
			this.car.isMove() ? `<div  class="forward-icon mt-2">⬇️️</div>` : null
		).join('');
	}

	#createForwardArrowTemplate() {
		return this.car.name
			.map(
				(name) =>
					`<div class="mr-2 racing-game">
					<div data-cy="${name}" class="car-player">${name}</div>
					${this.#getRacingGameProcess(this.car.tryConunt)}
				</div>`
			)
			.join('');
	}
}
