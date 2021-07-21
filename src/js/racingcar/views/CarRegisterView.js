import { DOM } from '../../constants/index.js';
import View from '../../core/View.js';
import { qs } from '../../helper.js';

export default class CarRegisterView extends View {
	constructor($component) {
		super($component);
		this.input = qs(DOM.CAR_NAMES_INPUT);
		this.btn = qs(DOM.CAR_SUBMIT_BTN);
	}
	addEvents = (controller) => {
		this.input.addEventListener('keyup', controller.handleCarRegisterKeyup);
		this.btn.addEventListener('click', controller.handleCarRegisterSubmitClick);
	};

	update = (model) => {
		const { hidden, value, focus, disabled } = model.state.carRegister;
		if (hidden) {
			this.hidden();
		} else {
			this.show();
			this.updateBtn(disabled);
			this.updateInput({ value, disabled, focus });
		}
	};
	// 의존하는 model상태에 따라 변화가 생기는 dom객체 단위로 구분하여 관리하도록 함
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
