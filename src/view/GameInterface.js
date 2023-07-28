import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMT_CAR_NAME } from '../constants/gameInterface.js'

export class GameInterface {
  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getUserInput() {
    const userInput = await this.rl.question(PROMT_CAR_NAME)
    this.rl.close()

    return userInput
  }

  printResult(positions, winners) {
    console.log(positions)
    console.log(winners)
  }
}
