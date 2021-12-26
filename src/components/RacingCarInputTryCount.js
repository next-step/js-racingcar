import { ACTION } from '../constants.js'
import View from '../core/View.js'
import { $ } from '../utils/selector.js'

export default class RacingCarInputTryCount extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
    this.mount()
    this.addEvent()
  }
  render = () => {
    const { carNames, carTryCount } = this.props.getState()
    if (carNames.length === 0) {
      this.$app.innerHTML = null
      return
    }
    this.$app.innerHTML = this.template(carTryCount)
    this.props.setState({ type: ACTION.RACING })
  }

  template = (carTryCount) => {
    return `
    <p>시도할 횟수를 입력해주세요.</p>
    <div class="d-flex">
      <input 
        id="input-try-count"
        type="number" 
        value="${carTryCount ? carTryCount : ''}"
        ${carTryCount ? 'disabled' : ''}
        class="w-100 mr-2" 
        placeholder="시도 횟수"
        min="0"
        data-cy="car-try-input"
        />
      <button 
        type="button" 
        class="btn btn-cyan btn-try-input"
        data-cy="car-try-btn"
      >
      확인
      </button>
    </div>
    </fieldset>
    `
  }

  addEvent = () => {
    this.$app.addEventListener('click', ({ target: { type } }) => {
      const tryCount = $('input[type="number"]').valueAsNumber
      if (type === 'button' && tryCount <= 0) {
        alert('0보다 큰 숫자여야 합니다.')
        return
      }
      if (type === 'button') {
        this.props.setState({ type: ACTION.UPDATE_TRY_COUNT, payload: tryCount })
      }
    })
  }
}
