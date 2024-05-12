import { readLineAsync } from '../utils/index.js'
import { carValidation } from '../rules/CarValidation.js'
import { raceValidation } from '../rules/raceValidation.js'

const View = {
  printRaceProgress(carName, position) {
    console.log(`${carName}: ${'-'.repeat(position)}`)
    console.log()
  },

  printRaceStart() {
    console.log('실행 결과')
  },

  printWinners(winners) {
    const winnerNames = winners.map((winner) => winner.name).join(', ')
    console.log(`${winnerNames}가 최종 우승했습니다.`)
  },

  async getSettings() {
    try {
      const cars = await this.getCarNames()
      const round = await this.getRaceRound()

      return { cars, round }
    } catch (error) {
      console.error(error)
    }
  },

  async getCarNames() {
    try {
      while (true) {
        const names = await readLineAsync(
          '경주할 자동차 이름을 입력하세요(이름은 쉼표(,)를 기준으로 구분).\n'
        )
        if (carValidation.validates(names)) return this.parsingCars(names)
      }
    } catch (error) {
      console.error(error)
    }
  },

  async getRaceRound() {
    try {
      while (true) {
        const round = await readLineAsync('시도할 횟수는 몇회인가요?')
        if (raceValidation.validates(round)) return this.parsingRound(round)
      }
    } catch (error) {
      console.error(error)
    }
  },

  /**
   * @param {string} cars
   * @returns string[]
   */
  parsingCars(cars) {
    return cars.split(',')
  },

  /**
   *
   * @param {string} round
   * @returns number
   */
  parsingRound(round) {
    return +round
  },
}

export default View
