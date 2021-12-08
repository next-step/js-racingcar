import { View } from '../../core/View'

export class RacingContainerView extends View<HTMLElement> {
  reset() {
    this.clear()
  }

  clear() {
    this.root.textContent = ''
  }
}
