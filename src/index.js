import { GameController } from './controller/GameController.js'

export class App {
  #gameController

  constructor() {
    this.#gameController = new GameController()
  }

  run() {
    this.#gameController.run()
  }
}

new App().run()
