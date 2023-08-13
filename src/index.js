import { GameController } from './domain/controller/GameController.js'

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
