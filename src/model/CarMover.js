import { makeRandomNum } from '../utils/helperUtils.js'
import { Car } from './Car.js'

export class CarMover {
  #raceCars

  constructor(cars) {
    this.#raceCars = this.#getRaceCars(cars)
  }

  #getRaceCars(cars) {
    return cars.map((carName) => new Car(carName))
  }

  moveCars() {
    return this.#raceCars.map((car) => {
      const score = makeRandomNum()
      car.move(score)
      return { car: car.name, position: car.position }
    })
  }

  get raceCars() {
    return this.#raceCars
  }
}
