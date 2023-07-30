import { GameController } from './controller/GameController.js'
import { GameView } from './view/GameView.js'

export class App {
  #gameController

  constructor() {
    const view = new GameView()
    this.#gameController = new GameController(view)
  }

  run() {
    this.#gameController.runGame()
  }
}

new App().run()
