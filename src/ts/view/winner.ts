import { State, Actions } from '../types.js'
import el from '../util/dom.js'
import View from './constructor.js'

type WatchState = Pick<State, 'winners'>
export default class Winner extends View {
  static #template = /* html */ `
    <section class="d-flex justify-center mt-5">
      <div>
        <h2>🏆 최종 우승자:  🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    </section>
  `

  $winner
  $restart

  constructor() {
    super()
    const $container = el(Winner.#template)
    this.$winner = $container.querySelector('h2') as HTMLHeadingElement
    this.$restart = $container.querySelector('button') as HTMLButtonElement
    this.$restart.addEventListener('click', this.onRestart)
    this.render($container)
  }

  watch = ({ winners }: State): WatchState => {
    return { winners }
  }

  onStoreUpdated({ winners }: WatchState) {
    if (!winners.length) {
      this.hide()
      return
    }
    this.$winner.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`
    this.show()
  }

  onRestart = () => {
    this.dispatch(Actions.reset)
  }
}

customElements.define('racingcar-winner', Winner)
