import el from '../util/dom.js'
import View from './constructor.js'
import Actions from '../store/action.js'
import { State } from '../store/index.js'
import { Status } from '../constants.js'

type WatchState = Pick<State, 'cars' | 'status'>

export default class FormCarNames extends View {
  static #template = `
  <form>
    <fieldset>
      <p>
        5자 이하의 자동차 이름을 콤마로 구분하여 입력해주세요. <br />
        예시) EAST, WEST, SOUTH, NORTH
      </p>
      <div class="d-flex">
        <input type="text" class="w-100 mr-2" placeholder="자동차 이름" />
        <button type="submit" class="btn btn-cyan">확인</button>
      </div>
    </fieldset>
  </form>
  `

  $input
  $form

  constructor() {
    super()
    this.$form = el(FormCarNames.#template) as HTMLFormElement
    this.$input = this.$form.querySelector('input') as HTMLInputElement
    this.$form.addEventListener('submit', this.onSubmit)
    el(this, [this.$form])
  }

  watch = ({ cars, status }: State): WatchState => ({ cars, status })

  onStoreUpdated({ cars, status }: WatchState) {
    if (status) {
      this.$input.disabled = status === Status.playing
    }

    if (!cars?.length) {
      this.focus()
    }
  }

  onSubmit = (e: Event) => {
    e.preventDefault()
    this.dispatch(Actions.setCarNames, { cars: this.$input.value.split(',') })
    this.$form.reset()
  }

  focus = () => {
    this.$input.focus()
    return this
  }

  connectedCallback() {
    super.connectedCallback()
    this.focus()
  }
}
