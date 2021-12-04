import { View, ViewProps } from '../../core/View'
import Car from '../../model/car.model'

export class CarContinerView extends View<HTMLElement> {
  #car
  $carContainer: HTMLDivElement

  constructor({ root, car }: ViewProps<HTMLElement> & { car: Car }) {
    super({ root })
    this.#car = car
    this.renderCarContainer()
  }

  render({ winners }: { winners: string[] }) {
    this.root.textContent = `🏆 최종 우승자: ${winners.join(', ')} 🏆`
  }

  renderCarContainer() {
    const $carContainer = document.createElement('div')
    $carContainer.classList.add('mr-2')

    $carContainer.innerHTML = `
      <div class="car-player">${this.#car.name}</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `
    this.root.insertAdjacentElement('beforeend', $carContainer)
    this.$carContainer = $carContainer
  }

  move() {
    const arrowElement = this.$carContainer.querySelector(
      '.d-flex'
    ) as HTMLElement

    arrowElement.outerHTML = `
      <div class="forward-icon mt-2">⬇️️</div>
      <div class="d-flex justify-center mt-3">
          <div class="relative spinner-container">
            <span class="material spinner"></span>
          </div>
        </div>
    `
  }

  stop() {
    const arrowElement = this.$carContainer.querySelector(
      '.d-flex'
    ) as HTMLElement

    arrowElement.remove()
  }
}
