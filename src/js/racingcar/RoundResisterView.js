import View from '../core/View.js';
import {$delegate, qs} from '../helper.js';

export default class RoundRegisterView extends View {
	constructor(controller, $component) {
		super(controller, $component);
		this.update(this.controller.model);
		this.addEvents();
	}
	template = (model) => {
		const {disabled, value, focus} = model.state.roundRegister;
		return `
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
            <input type="number" class="w-100 mr-2" placeholder="시도 횟수" ${
				value ? `value=${value}` : ''
			} ${disabled ? 'disabled' : ''} ${focus ? 'autoFocus' : ''}/>
            <button type="button" class="btn btn-cyan" ${disabled ? 'disabled' : ''}>확인</button>
        </div>
        `;
	};
	addEvents = () => {
		$delegate(this.$target, 'input', 'keypress', this.controller.handleRoundRegisterKeypress);
		$delegate(
			this.$target,
			'button',
			'click',
			this.controller.handleRoundRegisterSubmitClick(() => qs('input', this.$target)),
		);
	};
	update = (model) => {
		if (model.state.roundRegister.hidden) {
			this.hidden();
		} else {
			this.show();
			this.$target.innerHTML = this.template(model);
			// autoFocus가 제대로 동작하지 않아서 임시로 설정함.
			qs('input', this.$target).focus();
		}
	};
}
