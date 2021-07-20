import View from '../core/View.js';
import {$delegate} from '../helper.js';

export default class ResultView extends View {
	constructor(controller, $component) {
		super(controller, $component);
		this.update(this.controller.model);
		this.addEvents();
	}

	template = (model) => {
		const winners = model.state.gameResults.winners;
		return `
            <div class="d-flex justify-center mt-5">
                <div>
                    <h2>🏆 최종 우승자: ${winners} 🏆</h2>
                    <div class="d-flex justify-center">
                        <button type="button" class="btn btn-cyan">다시 시작하기</button>
                    </div>
                </div>
            </div>
        `;
	};
	addEvents = () => {
		$delegate(this.$target, 'button', 'click', this.controller.handleResetBtnClick);
	};
	update = (model) => {
		if (model.state.gameResults.hidden) {
			this.hidden();
		} else {
			this.show();
			this.$target.innerHTML = this.template(model);
		}
	};
}
