import { readLineAsync } from './utils/readlineAsync.js'
import { Car } from './car.js'
import { Race } from './race.js'

class Game {
  #cars
  #race

  async start() {
    this.#cars = await this.getCars()
    const round = await this.getRaceRound()

    this.#race = new Race(this.#cars, round)

    this.play()
    this.printWinner()
  }

  async getCars() {
    const inputNames = await readLineAsync('경주할 자동차 이름을 입력하세요. (구분 기호: 쉼표(,))\n')
    return inputNames.split(',').map(name => new Car(name))
  }

  async getRaceRound() {
    return await readLineAsync('시도할 회수는 몇회인가요?\n')
  }

  play() {
    for (let i = 1; i <= this.#race.round; i++) {
      this.#race.playTurn()
      this.printTurnResult()
    }
  }

  printTurnResult() {
    this.#cars.forEach(car => console.log(`${car.name} : ${'-'.repeat(car.position)}`))
    console.log('')
  }

  printWinner() {
    const winners = this.#race.getWinnerNames()
    console.log(`${winners.join(', ')}가 최종 우승했습니다.`)
  }
}

const game = new Game()
await game.start()