import Component from '../core/Component.js'
import { $get } from '../utils/dom.js'

class NameForm extends Component {
	constructor() {
		super()
	}

	mapState() {
		this.stateList = ['cars']
	}

	mapActions() {
		this.actionList = ['setCars']
	}

	setElements() {
		this.$nameInput = $get('input', this.$target)
		this.$nameBtn = $get('button', this.$target)
	}

	setEvents() {
		this.$nameBtn.addEventListener('click', () => {
			this.setCars(this.$nameInput.value)
		})
	}

	render() {
		this.$nameInput.value = Object.keys(this.cars).join(', ')

		const isDisabled = Object.keys(this.cars).length > 0

		this.$nameInput.disabled = isDisabled
		this.$nameBtn.disabled = isDisabled
	}

	template() {
		return /* html */ `
			<fieldset class="name-form">
				<h1 class="text-center">🏎️ 자동차 경주 게임</h1>
				<p>
					5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
					예시) EAST, WEST, SOUTH, NORTH
				</p>
				<div class="d-flex">
					<input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
					<button type="button" class="btn btn-cyan">확인</button>
				</div>
			</fieldset>
		`
	}
}

export default NameForm
