import { MOVE_THRESHOLD, RANDOM_BOUND } from '../constants/index.js'

class Car {
  name
  position = 0

  constructor(name) {
    this.name = name
  }

  raceMove() {
    const randomValue = this.getRandomValue()
    if (this.isCarMovable(randomValue)) this.moveForward()
  }

  moveForward() {
    this.position++
  }

  isCarMovable(randomValue) {
    return randomValue >= MOVE_THRESHOLD
  }

  getRandomValue() {
    return Math.floor(Math.random() * RANDOM_BOUND)
  }
}

export default Car
