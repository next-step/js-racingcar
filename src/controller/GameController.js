import { View } from '../view/View.js'
import { Game } from '../model/Game.js'

export class GameController {
  #game
  #view

  constructor() {
    this.#view = new View()
  }

  async run() {
    try {
      const carNames = await this.#view.getCarNames()
      const rounds = await this.#view.getRounds()
      this.#game = new Game(carNames, rounds)

      this.#game.run()
    } catch (error) {
      this.#view.printError(error)
      return this.run()
    }

    this.#view.printResult(this.#game.records, this.#game.winners)
    process.exit()
  }
}
