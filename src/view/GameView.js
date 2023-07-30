import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMT_CAR_NAME } from '../constants/gameInterface.js'

export class GameView {
  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getUserInput() {
    const userInput = await this.rl.question(PROMT_CAR_NAME)
    console.log(userInput + `\n`)

    const userInputArray = userInput.split(',')
    this.rl.close()

    return userInputArray
  }

  printResult(records, winners) {
    console.log(records)
    console.log(winners)
  }
}
