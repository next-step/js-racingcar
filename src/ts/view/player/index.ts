import { State, Elem } from '../../types.js'
import { Boundaries } from '../../constants.js'
import el from '../../util/dom.js'
import View from '../abstract.js'

type WatchState = Pick<State, 'trial' | 'processing'> & { scores: number[] }

export default class Player extends View {
  #scoreElems: Elem[]
  #index
  #nameEl
  #waitingElString = '<racingcar-player-waiting>'
  #forwardElString = '<racingcar-player-forward>'

  constructor() {
    super()
    this.className = 'mr-2'
    this.#index = Number(this.getAttribute('index'))
    this.#nameEl = el(/* html */ `<racingcar-player-name>${this.getAttribute('name')}</racingcar-player-name>`)
  }

  watch = ({ trial, processing, scores }: State): WatchState => {
    return { trial, processing, scores: scores[this.#index] }
  }

  connectedCallback() {
    super.connectedCallback()
    this.#scoreElems = [this.#nameEl]
    this.render(this.#scoreElems)
  }

  onStoreUpdated({ trial: newTrial, processing: newPending, scores: newStatus }: WatchState) {
    if (newTrial === 0) {
      this.#scoreElems = [this.#nameEl]
    }

    if (this.#scoreElems[this.#scoreElems.length - 1] === this.#waitingElString) {
      this.#scoreElems.pop()
    }

    if (newPending && newTrial) {
      this.#scoreElems.push(this.#waitingElString)
    } else if (
      newStatus &&
      newStatus.filter(num => num >= Boundaries.ForwardCutOff).length === this.#scoreElems.length
    ) {
      this.#scoreElems.push(this.#forwardElString)
    }
    this.render(this.#scoreElems)
  }
}

customElements.define('racingcar-player', Player)
