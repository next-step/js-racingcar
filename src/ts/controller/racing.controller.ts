import Car from '../model/car.model'

class RacingController {
  cars: Car[]

  resetGame() {
    this.cars = []
  }

  startGame() {
    while (true) {
      this.cars.forEach((car) => {
        car.move()
      })

      const isEnd = this.cars
        .map((car) => car.getIsStopProgress())
        .some((progress) => progress)

      if (isEnd) {
        break
      }
    }
  }
}

export default RacingController
