export class RacingStore {
  #targetProgress: number
  #currentProgress: number

  progressRacingTurn() {
    this.#currentProgress += 1
  }

  set gameCount(count: number) {
    this.#targetProgress = count
    this.#currentProgress = 0
  }

  get isGameEnd() {
    return this.#currentProgress === this.#targetProgress
  }
}
