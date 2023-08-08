import { View } from '../view/View.js'
import { Game } from '../model/Game.js'

export class GameController {
  #game
  #view

  constructor() {
    this.#view = new View()
  }

  async run() {
    await this.#view.getUserInput()

    const userInput = this.#view.userInput
    this.#game = new Game(userInput)
    this.#game.run()

    this.#view.printResult(this.#game.records, this.#game.winners)
  }
}
