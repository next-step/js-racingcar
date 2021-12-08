import { getRamdomNumber } from '../utils/random'

type MoveResponse = { isProgress: boolean }
class Car {
  name: string

  #progressDistance: number

  constructor(name: string) {
    this.name = name
    this.#progressDistance = 0
  }

  move(): MoveResponse {
    const isProgress = this.isProgress()

    if (isProgress) {
      this.#progressDistance += 1
    }

    return { isProgress }
  }

  isProgress() {
    return getRamdomNumber({ min: 0, max: 9 }) >= 4
  }

  get moveDistance() {
    return this.#progressDistance
  }
}

export default Car
