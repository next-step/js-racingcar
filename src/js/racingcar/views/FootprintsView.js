import View from '../../core/View.js';

export default class FootprintsView extends View {
	// 함수는 위에서 아래로 맥락이 흘러야 한다.
	update = (model) => {
		const { footprints, candidates, hidden } = model.state.gameFootprints;
		if (hidden) {
			this.hidden();
		} else {
			this.show();
			this.renderGameDashboard({ footprints, candidates });
		}
	};
	renderGameDashboard = ({ footprints, candidates }) => {
		this.$target.innerHTML = this.carGameDashboradtemplate(
			footprints,
			candidates
		);
	};

	carGameDashboradtemplate = (footprints, candidates) => {
		return `
				<div class="d-flex justify-center mt-5 game-footprints">
						<div class="mt-4 d-flex">
						${candidates
							.map(
								(player, index) => `
									<div class="mr-2">
									<div class="car-player">${player}</div>
									${footprints.length && this.playerFootPrint(footprints[index])}
									</div>
									`
							)
							.join('')}
						</div>
				</div>

				`;
	};
	playerFootPrint = (footPrint) => {
		return footPrint
			.map((playerFootPrints) =>
				playerFootPrints === 'spinner'
					? this.spinnerTemplate()
					: this.footPrintTemplate()
			)
			.join('');
	};

	spinnerTemplate = () => {
		return `
        <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
                <span class="material spinner"></span>
            </div>
        </div>
        `;
	};

	footPrintTemplate = () => {
		return `
        <div class="forward-icon mt-2">⬇️️</div>
        `;
	};
}
