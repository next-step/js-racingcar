import Component from '../core/Component.js'
import { $get } from '../utils/dom.js'

class Result extends Component {
	constructor() {
		super()
	}

	mapState() {
		this.stateList = ['winners']
	}

	mapActions() {
		this.actionList = ['initStore']
	}

	setElements() {
		this.$winnersSpan = $get('span.winners', this.$target)
		this.$restartBtn = $get('button', this.$target)
	}

	setEvents() {
		this.$restartBtn.addEventListener('click', () => {
			this.initStore()
		})
	}

	render() {
		if (this.winners.length === 0) {
			this.$target.style.display = 'none'
			return
		}

		this.$target.style.display = ''
		this.$winnersSpan.innerText = this.winners.join(', ')
	}

	template() {
		return /* html */ `
      <div>
        <h2>🏆 최종 우승자: <span class="winners"></span> 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
		`
	}
}

export default Result
