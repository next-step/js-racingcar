import { RaceError } from './errors/raceError.js'

export class Race {
  #round
  #cars

  constructor(cars, round) {
    this.#cars = cars

    if (!Number(round)) throw new RaceError.InvalidRound()
    this.#round = round
  }

  get round() {
    return this.#round
  }

  get cars() {
    return this.#cars
  }

  playTurn() {
    this.#cars.forEach(car => {
      const randomNumber = Math.floor(Math.random() * 10)
      car.moveForward(randomNumber)
    })
  }

  getWinnerNames() {
    const maxPosition = Math.max(...this.#cars.map(car => car.position))
    const winners = this.#cars.filter(car => car.position === maxPosition)
    return winners.map(winner => winner.name)
  }
}