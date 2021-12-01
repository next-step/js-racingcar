import el from '../util/dom.js'
import View from './constructor.js'
import { State, Status, Actions } from '../types.js'

type WatchState = Pick<State, 'cars' | 'totalAttempts' | 'status'>

export default class FormAttempts extends View {
  static #template = /* html */ `
    <form>
      <fieldset>
        <p>시도할 횟수를 입력해주세요.</p>
        <div class="d-flex">
          <input type="number" class="w-100 mr-2" placeholder="시도 횟수" min="1" />
          <button type="submit" class="btn btn-cyan">확인</button>
        </div>
      </fieldset>
    </form>
  `

  $input
  $form

  constructor() {
    super()
    this.$form = el(FormAttempts.#template) as HTMLFormElement
    this.$input = this.$form.querySelector('input') as HTMLInputElement
    this.$form.addEventListener('submit', this.onSubmit)
    this.render(this.$form)
  }

  watch = ({ cars, totalAttempts, status }: State): WatchState => ({ cars, totalAttempts, status })

  onStoreUpdated({ cars, totalAttempts, status }: WatchState) {
    if (status) {
      this.$input.disabled = status === Status.playing
    }

    if (totalAttempts) return

    if (cars) {
      if (cars.length) this.show().focus()
      else this.hide()
      return
    }
  }

  onSubmit = (e: Event) => {
    e.preventDefault()
    this.dispatch(Actions.setTotalAttempts, { totalAttempts: +this.$input.value })
    this.$form.reset()
  }

  focus = () => {
    this.$input.focus()
    return this
  }
}

customElements.define('racingcar-form-attempts', FormAttempts)
