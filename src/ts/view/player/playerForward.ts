import View from '../constructor.js'

export default class PlayerForward extends View {
  constructor() {
    super()
    this.className = 'forward-icon mt-2'
    this.textContent = '⬇️'
  }
}

customElements.define('racingcar-player-forward', PlayerForward)
