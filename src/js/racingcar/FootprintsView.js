import View from '../core/View.js';

export default class Footprints extends View {
	constructor(controller, $component) {
		super(controller, $component);
		this.update(this.controller.model);
		this.addEvents();
	}

	spinnerTemplate = () => {
		return `
        <div class="d-flex justify-center mt-3">
            <div class="relative spinner-container">
                <span class="material spinner"></span>
            </div>
        </div>
        `;
	};
	playerFootPrint = (footPrint) => {
		return footPrint
			.map((playerFootPrints) =>
				playerFootPrints === 'spinner' ? this.spinnerTemplate() : this.footPrintTemplate(),
			)
			.join('');
	};

	footPrintTemplate = () => {
		return `
        <div class="forward-icon mt-2">⬇️️</div>
        `;
	};
	template = (model) => {
		const {footprints, candidates} = model.state.gameFootprints;
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
                        `,
				)
				.join('')}
            </div>
        </div>

        `;
	};
	update = (model) => {
		if (model.state.gameFootprints.hidden) {
			this.hidden();
		} else {
			this.show();
			this.$target.innerHTML = this.template(model);
		}
	};
}
