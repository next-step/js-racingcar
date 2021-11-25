import { getRamdomNumber } from '../utils/random'

class Car {
  name: string
  #progressDistance: number
  #tryCount: number

  constructor(name: string) {
    this.name = name
    this.#progressDistance = 0
    this.#tryCount = 0
  }

  move() {
    const isProgress = this.getIsProgress()

    if (isProgress) {
      this.#progressDistance += 1
    }
  }

  getIsStopProgress() {
    return this.#tryCount === this.#progressDistance
  }

  getIsProgress() {
    return getRamdomNumber({ min: 0, max: 9 }) >= 4
  }

  set tryCount(count: number) {
    this.#tryCount = count
  }

  get moveDistance() {
    return this.#progressDistance
  }
}

export default Car
