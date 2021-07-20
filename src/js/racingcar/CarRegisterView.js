import View from '../core/View.js';
import {$delegate, qs} from '../helper.js';

export default class CarRegisterView extends View {
	constructor(controller, $component) {
		super(controller, $component);
		this.update(this.controller.model);
		this.addEvents();
	}
	template = (model) => {
		const {disabled, value, focus} = model.state.carRegister;
		return `
        <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
        <p>
            5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
            예시) EAST, WEST, SOUTH, NORTH
        </p>
        <div class="d-flex">
            <input type="text" class="w-100 mr-2" placeholder="자동차 이름" ${
				value ? `value=${value}` : ''
			} ${disabled ? 'disabled' : ''} ${focus ? 'autoFocus' : ''}/>
            <button type="button" class="btn btn-cyan" ${disabled ? 'disabled' : ''}>확인</button>
        </div>
        `;
	};
	addEvents = () => {
		$delegate(this.$target, 'input', 'keypress', this.controller.handleCarRegisterKeypress);
		$delegate(
			this.$target,
			'button',
			'click',
			this.controller.handleCarRegisterSubmitClick(() => qs('input', this.$target)),
		);
	};
	update = (model) => {
		if (model.state.carRegister.hidden) {
			this.hidden();
		} else {
			this.show().innerHTML = this.template(model);
		}
	};
}
