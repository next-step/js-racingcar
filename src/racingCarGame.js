import { DEFAULT_MAX_MATCH_LENGTH } from './constants/RacingCarList'
import { RUN_THRESHOLDS } from './constants/car'
import { GAME_ERROR_MESSAGE } from './constants/racingCarGame'
import { getRandomNumber } from './utils/number'
import { RacingCarList } from './RacingCarList'
import { gamePrompt } from './gamePrompt'

export class RacingCarGame {
  #capturedError
  #racingCarList

  start(carNames) {
    this.#initializeRacingCarList(carNames)

    if (this.#capturedError) {
      return
    }

    let match = 0

    while (match < DEFAULT_MAX_MATCH_LENGTH) {
      match++
      this.#racingCarList.startRound()
    }

    console.log(
      `\n${this.#racingCarList.getWinners().join(', ')}가 최종 우승했습니다.`
    )
  }

  #initializeRacingCarList(carNames) {
    try {
      const racingCarList = new RacingCarList()
      racingCarList.subscribeError(this.#errorTracker.bind(this))

      racingCarList.init({
        carNames,
        runCondition: () => getRandomNumber() > RUN_THRESHOLDS,
        onEndRound: this.#printEndRound
      })

      this.#racingCarList = racingCarList
    } catch (e) {
      console.error(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
      gamePrompt.close()
    }
  }

  #printEndRound(cars) {
    const currentTrack = car =>
      `${car.getName()} : ${'-'.repeat(car.getPosition())}`

    const result = cars.map(currentTrack).join('\n')
    console.log(`\n${result}`)
  }

  #errorTracker({ error }) {
    console.error(error.message)
    console.error(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
    gamePrompt.close()

    this.#capturedError = error
    this.#racingCarList = null
  }
}
