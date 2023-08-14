import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import { PROMPT } from '../constants/gameInterface.js'

export class View {
  #formattedRecords
  #formattedWinners

  constructor() {
    this.rl = readline.createInterface({
      input,
      output,
    })
  }

  async getCarNames() {
    return (await this.#getUserInput(PROMPT.SET_CAR_NAMES)).split(',')
  }

  async getRounds() {
    return await this.#getUserInput(PROMPT.SET_ROUNDS)
  }

  printResult(records, winners) {
    this.#setFormattedResults(records, winners)

    console.log(this.#formattedRecords)
    console.log(this.#formattedWinners)
  }

  printError(error) {
    console.log(error.message)
  }

  async #getUserInput(prompt) {
    const userInput = await this.rl.question(prompt)
    return userInput
  }

  #formatRecords(records) {
    let result = ['\n실행 결과\n']
    const names = Object.keys(records)
    const originalRecord = records[names[0]]

    const formattedRecords = originalRecord.map((_, idx) => {
      const recordLines = names.map((name) => {
        const position = records[name][idx] || 0
        return `${name}:${'-'.repeat(position)}\n`
      })

      return [...recordLines, '\n'].join('')
    })

    return [...result, ...formattedRecords].join('')
  }

  #formatWinners(winners) {
    return winners.join(', ') + '(이)가 최종 우승했습니다.'
  }

  #setFormattedResults(records, winners) {
    this.#formattedRecords = this.#formatRecords(records)
    this.#formattedWinners = this.#formatWinners(winners)
  }

  get formattedRecords() {
    return this.#formattedRecords
  }

  get formattedWinners() {
    return this.#formattedWinners
  }
}
