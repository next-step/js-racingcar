import { ViewComponents } from '../controller/racing.controller'
import { getRamdomNumber } from '../utils/random'

class Car {
  name: string
  #progressDistance: number
  #targetCount: number
  #viewContiner: HTMLElement
  #RoadElement: HTMLDivElement

  constructor(name: string) {
    this.name = name
    this.#progressDistance = 0
    this.#targetCount = 0
    this.#viewContiner = ViewComponents.RacingContainer
  }

  move(currentCount: number) {
    const isProgress = this.isProgress()

    if (isProgress) {
      this.#progressDistance += 1
      this.renderProgressArrow()
    }

    if (this.isGameEnded(currentCount)) {
      const arrowElement = this.#RoadElement.querySelector(
        '.d-flex'
      ) as HTMLElement

      arrowElement.remove()
    }
  }

  createContainer() {
    const RoadElement = document.createElement('div')
    RoadElement.classList.add('mr-2')

    RoadElement.innerHTML = `
      <div class="car-player">${this.name}</div>
      <div class="d-flex justify-center mt-3">
        <div class="relative spinner-container">
          <span class="material spinner"></span>
        </div>
      </div>
    `

    this.#RoadElement = RoadElement
  }

  renderRoad() {
    this.createContainer()
    this.#viewContiner.insertAdjacentElement('beforeend', this.#RoadElement)
  }

  renderProgressArrow() {
    const arrowElement = this.#RoadElement.querySelector(
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

  set targetCount(count: number) {
    this.#targetCount = count
  }

  isGameEnded(currentCount: number) {
    return this.#targetCount === currentCount
  }
  isProgress() {
    return getRamdomNumber({ min: 0, max: 9 }) >= 4
  }

  get moveDistance() {
    return this.#progressDistance
  }
}

export default Car
