import { DOM } from '../../constants/index.js';
import View from '../../core/View.js';
import { $delegate, qs } from '../../helper.js';

export default class ResultView extends View {
	constructor($component) {
		super($component);
		this.$winnner = qs(DOM.WINNERS);
	}

	addEvents = (controller) => {
		$delegate(this.$target, 'button', 'click', controller.handleResetBtnClick);
	};
	update = (model) => {
		const { winners, hidden } = model.state.gameResults;
		if (hidden) {
			this.hidden();
		} else {
			this.show();
			this.updateWinners(winners);
		}
	};
	updateWinners = (winners) => {
		this.$winnner.innerText = this.winnerTextTemplate(winners);
	};
	winnerTextTemplate = (winners) => {
		return `
				🏆 최종 우승자: ${winners} 🏆
				`;
	};
}
