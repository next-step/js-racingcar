import { getRamdomNumber } from '../utils/random'

type GameStatus = 'playing' | 'end'
type MoveResponse = { type: GameStatus; move: boolean }
class Car {
  name: string

  #progressDistance: number
  #targetCount: number
  #currentCount: number

  constructor(name: string) {
    this.name = name
    this.#progressDistance = 0
    this.#targetCount = 0
    this.#currentCount = 0
  }

  move(): MoveResponse {
    const isProgress = this.isProgress()
    const status: GameStatus = this.isGameEnded() ? 'end' : 'playing'

    if (isProgress) {
      this.#progressDistance += 1
    }

    return { type: status, move: isProgress }
  }

  isGameEnded() {
    return this.#targetCount === this.#currentCount
  }
  isProgress() {
    this.#currentCount += 1

    return getRamdomNumber({ min: 0, max: 9 }) >= 4
  }

  set targetCount(count: number) {
    this.#targetCount = count
  }

  get moveDistance() {
    return this.#progressDistance
  }
}

export default Car
