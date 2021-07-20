import Component from '../core/Component.js'
import { $get } from '../utils/dom.js'

class NumForm extends Component {
	constructor() {
		super()
	}

	mapState() {
		this.stateList = ['num']
	}

	mapActions() {
		this.actionList = ['setNum']
	}

	setElements() {
		this.$numInput = $get('input', this.$target)
		this.$numBtn = $get('button', this.$target)
	}

	setEvents() {
		this.$numBtn.addEventListener('click', () => {
			this.setNum(this.getNewNum())
		})
	}

	getNewNum() {
		return +this.$numInput.value
	}

	render() {
		this.$numInput.value = this.num

		const isDisabled = this.num !== ''

		this.$numInput.disabled = isDisabled
		this.$numBtn.disabled = isDisabled
	}

	template() {
		return /* html */ `
			<fieldset class="num-form">
				<p>시도할 횟수를 입력해주세요.</p>
				<div class="d-flex">
					<input type="number" class="w-100 mr-2" placeholder="시도 횟수" />
					<button type="button" class="btn btn-cyan">확인</button>
				</div>
			</fieldset>
		`
	}
}

export default NumForm
