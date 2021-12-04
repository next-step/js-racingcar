import { View } from '../../core/View'

export class CarNameInputView extends View<HTMLInputElement> {
  reset() {
    this.root.value = ''
    this.focus()
  }

  focus() {
    this.root.focus()
  }
}
