import { DEFAULT_MAX_MATCH_LENGTH } from './constants/carRace'
import { RUN_THRESHOLDS } from './constants/car'
import { GAME_ERROR_MESSAGE } from './constants/racingCarGame'
import { getRandomNumber } from './utils/number'
import { CarRace } from './carRace'
import { gameEnd, gameStart } from './gamePrompt'

export class RacingCarGame {
  #carRace

  constructor() {
    const origin = this

    return new Proxy(this, {
      get(target, key) {
        const method = Reflect.get(target, key)

        return (...args) => {
          try {
            return method.apply(origin, args)
          } catch (error) {
            console.log('catch error!!!!!!')

            if (error.cause === undefined) {
              console.log(GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR)
            } else {
              console.log(`${error.cause}에서 발생한 에러 : ${error.message}`)
            }

            gameEnd()
          }
        }
      }
    })
  }

  async start() {
    const carNames = await gameStart()

    this.#init(carNames)
    let match = 0

    while (match < DEFAULT_MAX_MATCH_LENGTH) {
      match++
      this.#carRace.startRound()
    }

    console.log(
      `\n${this.#carRace.getWinners().join(', ')}가 최종 우승했습니다.`
    )
    gameEnd()
  }

  #init(carNames) {
    this.#carRace = new CarRace({
      carNames,
      runCondition: () => getRandomNumber() > RUN_THRESHOLDS,
      onEndRound: this.#printEndRound
    })
  }

  #printEndRound(cars) {
    const currentTrack = car =>
      `${car.getName()} : ${'-'.repeat(car.getPosition())}`

    const result = cars.map(currentTrack).join('\n')
    console.log(`\n${result}`)
  }
}
