import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMT_CAR_NAME } from '../constants/gameInterface.js'
import { ERROR_MESSAGE } from '../constants/errorMessages.js'

export class View {
  #userInput
  #formattedRecords
  #formattedWinners

  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getUserInput() {
    const userInput = await this.rl.question(PROMT_CAR_NAME)

    const userInputArray = userInput.split(',')
    this.rl.close()

    this.#validateDuplicates(userInputArray)
    this.#setUserInput(userInputArray)
  }

  printResult(records, winners) {
    this.#setFormattedResults(records, winners)

    console.log(this.#formattedRecords)
    console.log(this.#formattedWinners)
  }

  #validateDuplicates(names) {
    if (new Set(names).size !== names.length) {
      throw new Error(ERROR_MESSAGE.DUPLICATED_INPUTS)
    }
  }

  #setUserInput(userInput) {
    this.#userInput = userInput
  }

  #formatRecords(records) {
    let result = ['\n실행 결과\n']
    const names = Object.keys(records)
    const length = records[names[0]].length
    for (let i = 0; i < length; i++) {
      for (const name of names) {
        const position = records[name][i] || 0
        result.push(`${name}:${'-'.repeat(position)}\n`)
      }
      result.push(`\n`)
    }
    return result.join('')
  }

  #formatWinners(winners) {
    return winners.join(', ') + '(이)가 최종 우승했습니다.'
  }

  #setFormattedResults(records, winners) {
    this.#formattedRecords = this.#formatRecords(records)
    this.#formattedWinners = this.#formatWinners(winners)
  }

  get userInput() {
    return this.#userInput
  }

  get formattedRecords() {
    return this.#formattedRecords
  }

  get formattedWinners() {
    return this.#formattedWinners
  }
}
