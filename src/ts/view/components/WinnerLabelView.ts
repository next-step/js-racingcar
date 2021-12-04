import { View } from '../../core/View'

export class WinnerLabelView extends View<HTMLElement> {
  reset() {
    this.clear()
  }

  clear() {
    this.root.textContent = ''
  }

  render({ winners }: { winners: string[] }) {
    this.root.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`
  }
}
