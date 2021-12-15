import { ACTION } from '../constants.js'
import View from '../core/View.js'
import { delay } from '../utils/index.js'

export default class RacingCarCompetition extends View {
  constructor(app, props) {
    super(app, props)
    this.render()
  }
  render = () => {
    const { carRacing, carTryCount } = this.props.getState()

    if (Object.keys(carRacing).length === 0) {
      this.$app.innerHTML = ''
      return
    }
    this.$app.innerHTML = this.template(carRacing)

    if (carTryCount === 0) {
      this.props.setState({ type: ACTION.SHOW_WINNER, payload: carRacing })
      return
    }
    delay(() => this.props.setState({ type: ACTION.RACING }))
  }

  template = (carRacing) => {
    return Object.keys(carRacing)
      .map((name) => {
        return `<div class="mr-2">
        <div class="car-player">${name}</div>
          ${carRacing[name].map(this.renderMove).join('')}
        </div>`
      })
      .join('')
  }

  renderMove = (n) => {
    const forward = `<div class="forward-icon mt-2">⬇️️</div>`
    const spinner = `<div class="d-flex justify-center mt-3">
      <div class="relative spinner-container">
        <span class="material spinner"></span>
      </div>
    </div>`
    return n >= 4 ? forward : spinner
  }
}
