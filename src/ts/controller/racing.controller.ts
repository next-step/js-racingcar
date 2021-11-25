import { NAME_LENGTH_INVALID_ERROR } from '../constants/Message'
import Car from '../model/car.model'

type ControllerResponse = { success: boolean; message?: string }

class RacingController {
  cars: Car[]

  resetGame() {
    this.cars = []
  }

  startGame() {
    while (true) {
      this.cars.forEach((car) => {
        car.move()

        car.getIsStopProgress()
      })

      const isEnd = this.cars
        .map((car) => car.getIsStopProgress())
        .some((progress) => progress)

      if (isEnd) {
        break
      }
    }
  }

  splitCarNames(carNames: string) {
    return carNames.split(',').map((name) => name.trim())
  }

  set gameCount(count: number) {
    this.cars.forEach((car) => {
      car.tryCount = count
    })
  }

  setCarNames(carNames: string): ControllerResponse {
    const carNameArray = this.splitCarNames(carNames)

    for (const carName of carNameArray) {
      if (carName.length > 5) {
        return { success: false, message: NAME_LENGTH_INVALID_ERROR }
      }
      this.cars.push(new Car(carName))
    }

    return { success: true }
  }
}

export default RacingController
