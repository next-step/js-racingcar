import { View } from '../../core/View'

export class GameCountInputView extends View<HTMLInputElement> {
  reset() {
    this.clear()
    this.focus()
  }

  clear() {
    this.root.value = ''
  }

  focus() {
    this.root.focus()
  }
}
