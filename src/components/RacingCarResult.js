import { ACTION } from '../constants.js'
import View from '../core/View.js'
import { delay } from '../utils/index.js'

export default class RacingCarCompetition extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
    this.addEvent()
  }

  render = () => {
    const { winners } = this.props.getState()
    if (winners.length === 0) {
      this.$app.innerHTML = null
      return
    }
    delay(() => alert('🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇'), 2000)
    this.$app.innerHTML = this.template(winners)
  }

  template = (winners) => {
    return `
    <div>
      <h2 data-cy="winners">🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>`
  }

  addEvent = () => {
    this.$app.addEventListener('click', ({ target: { type } }) => {
      if (type === 'button') {
        this.props.setState({ type: ACTION.RESET_RACING })
      }
    })
  }
}
