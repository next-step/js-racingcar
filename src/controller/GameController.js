export class GameController {
  #gameView
  #raceTrack

  constructor(gameView) {
    this.#gameView = gameView
  }

  runGame() {
    const userInput = this.#gameView.getUserInput()
    this.#raceTrack(userInput)

    const result = this.#raceTrack.race()

    this.#gameView.printResult(result)
  }
}
