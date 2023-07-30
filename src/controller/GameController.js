import { RaceTrack } from '../model/RaceTrack.js'
import { validateDuplicates } from '../utils/validate.js'
export class GameController {
  #gameView
  #raceTrack

  constructor(gameView) {
    this.#gameView = gameView
  }

  async runGame() {
    const userInput = await this.#gameView.getUserInput()
    this.#raceTrack = new RaceTrack(userInput)

    this.#raceTrack.race()

    const records = this.#raceTrack.records
    const winners = this.#raceTrack.winners

    this.#gameView.printResult(records, winners)
  }
}
