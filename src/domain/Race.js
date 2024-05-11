import View from '../view/view.js'
import Car from './Car.js'

class Race {
  cars = []
  currentRound = 0
  round = 0

  constructor(cars = [], round = 0) {
    this.cars = cars.map((car) => new Car(car))
    this.round = round
  }

  start() {
    View.printRaceStart()
    for (let i = 0; i < this.round; i++) {
      this.moveCars()
      this.onNextRound()
    }
    View.printWinners(this.getWinners())
  }

  moveCars() {
    this.cars.forEach((car) => {
      car.raceMove()
      View.printRaceProgress(car.name, car.position)
    })
  }

  onNextRound() {
    this.currentRound++
  }

  getTotalRounds() {
    return this.currentRound
  }

  getWinners() {
    const highestPosition = Math.max(...this.cars.map((car) => car.position))
    return this.cars.filter((car) => car.position === highestPosition)
  }
}

export default Race
