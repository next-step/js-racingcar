import { ERROR, SETTING, MESSAGES } from './constants/index.js'

export class CarRacer { 
  #names = new Map()
  #round = SETTING.ROUND

  constructor() {}

  set names (input) {
    const names = input.split(',')
    names.forEach(name => this.#names.set(this.validation(name.trim()), 0))
    this.raceStart()
  }

  get names () {
    return Array.from(this.#names, ([key, value]) => key);
  }

  validation(name) {
    if(name.length > SETTING.MAX_NAME_LENGTH) {
      throw new Error(ERROR.MAX_NAME)
    }

    if(name.length < SETTING.MIN_NAME_LENGTH) {
      throw new Error(ERROR.MIN_NAME)
    }
    return name
  }

  raceStart() {
    console.log(`\n${MESSAGES.RESULT}`)

    for(let i = 0; i < this.#round; i++) {
      this.#names.forEach((value, key) => this.printResult(value, key))
      console.log('\n')
    }

    this.printWinner()
  }

  printResult(value, key) {
    const score = this.randomNumber() >= 4 ? 1 : 0
    this.#names.set(key, this.#names.get(key) + score)
    console.log(`${key} : ${'-'.repeat(value + score)}`)
  }
  
  printWinner() {
    console.log(`${this.getWinner()}${MESSAGES.FINISH}`)
    process.exit()
  }

  randomNumber() {
     return Math.floor(Math.random() * 10)
  }


  getWinner() {
    const maxScore = Math.max(...this.#names.values())
    const winner = this.names.filter(name => this.#names.get(name) === maxScore)
    return winner.join(', ')
  }
}