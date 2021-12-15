import { ACTION } from '../constants.js'
import View from '../core/View.js'
import { $ } from '../utils/selector.js'

export default class RacingCarInputName extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
    this.addEvent()
  }

  template = () => {
    const { carNames } = this.props.getState()
    const disabled = carNames.length !== 0
    const values = carNames.join(', ')

    return `
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input 
          type="text" 
          name="name" 
          class="w-100 mr-2" 
          placeholder="자동차 이름" 
          value="${values ? values : ''}"
          ${disabled ? 'disabled' : ''}
        />
        <button type="button" class="btn btn-cyan btn-car-name">확인</button>
      </div>
    `
  }

  addEvent = () => {
    this.$app.addEventListener('click', ({ target: { type } }) => {
      if (type === 'button') this.submitCarNames()
    })
    this.$app.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submitCarNames()
    })
  }

  submitCarNames = () => {
    const formValues = new FormData($('#car-form')).values().next().value
    const names = formValues.split(',').map((v) => v.trim())
    if (!this.isValidNames(names)) {
      alert('이름은 5자 이하만 가능하다.')
      return
    }
    this.props.setState({ type: ACTION.UPDATE_CAR_NAME, payload: names })
  }

  isValidNames = (names) => names.every((name) => name.length <= 5)
}
