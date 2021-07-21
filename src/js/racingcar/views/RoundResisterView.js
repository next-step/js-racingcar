import { DOM } from '../../constants/index.js';
import View from '../../core/View.js';
import { qs } from '../../helper.js';

export default class RoundRegisterView extends View {
	constructor($component) {
		super($component);
		this.input = qs(DOM.ROUND_INPUT);
		this.btn = qs(DOM.ROUND_SUBMIT_BTN);
	}
	addEvents = (controller) => {
		this.input.addEventListener('keyup', controller.handleRoundRegisterKeyup);
		this.btn.addEventListener(
			'click',
			controller.handleRoundRegisterSubmitClick
		);
	};

	update = (model) => {
		const { disabled, value, focus, hidden } = model.state.roundRegister;
		if (hidden) {
			this.hidden();
		} else {
			this.show();
			this.updateInput({ value, disabled, focus });
			this.updateBtn(disabled);
		}
	};
	updateInput = ({ value, disabled, focus }) => {
		this.input.disabled = disabled;
		if (value) {
			this.input.value = value;
		}
		focus && this.input.focus();
	};
	updateBtn = (disabled) => {
		this.btn.disabled = disabled;
	};
}
