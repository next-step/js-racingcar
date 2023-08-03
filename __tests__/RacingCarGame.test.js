import { GAME_ERROR_MESSAGE } from '../src/constants/racingCarGame'
import * as number from '../src/utils/number'
import { RacingCarGame } from '../src/racingCarGame'
import {
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE
} from '../src/constants/carRace'
import * as gamePrompt from '../src/gamePrompt'

const mockRunOnlyFirstCar = () => {
  let runCount = 0

  jest
    .spyOn(number, 'getRandomNumber')
    .mockImplementation(() => (runCount++ % 3 === 0 ? 5 : 0))
}

const mockCarNames = carNames => {
  jest
    .spyOn(gamePrompt, 'gameStart')
    .mockImplementation(jest.fn(() => Promise.resolve(carNames)))

  jest.spyOn(gamePrompt, 'gameEnd').mockImplementation(() => {})
}

describe('RacingCarGame - Feature', () => {
  let logSpy
  const carNames = 'sonny, son, son2'

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('게임이 완료된 후, 누가 우승했는지 알려주며 우승자가 여러명인 경우, 쉼표로 구분하여 알려준다.', async () => {
    // Given
    mockCarNames(carNames)
    jest.spyOn(number, 'getRandomNumber').mockImplementation(() => 5)
    const racingCarGame = new RacingCarGame()

    // When
    await racingCarGame.start()

    // Then
    expect(logSpy.mock.calls.at(-1)[0]).toBe(
      `\n${carNames}가 최종 우승했습니다.`
    )
  })

  test('게임에서 sonny가 가장 많이 앞서나갔을 경우, 게임이 완료되었을 때 sonny가 우승했는지 알려준다.', async () => {
    // Given
    mockCarNames(carNames)
    mockRunOnlyFirstCar()
    const racingCarGame = new RacingCarGame(carNames)

    // When
    await racingCarGame.start()

    // Then
    expect(logSpy.mock.calls.at(-1)[0]).toEqual('\nsonny가 최종 우승했습니다.')
  })
})

describe('RacingCarGame - Error', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test.only('사용자가 잘못된 입력 값을 작성한 경우, "오류로 인해 게임이 종료되었습니다!"라는 에러 메시지 출력과 함께 프로그램을 종료한다.', async () => {
    // Given
    mockCarNames(null)
    const racingCarGame = new RacingCarGame()

    // When
    await racingCarGame.start()

    //Then
    expect(logSpy.mock.calls.at(-1)[0]).toEqual(
      GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR
    )
  })

  test('사용자가 자동차 이름을 1개만 입력했을 경우, "오류로 인해 게임이 종료되었습니다!"라는 에러 메시지 출력과 함께 프로그램을 종료한다.', () => {
    // Given
    const inValidCarNames = 'sonny'

    // When
    new RacingCarGame(inValidCarNames)

    //Then
    expect(logSpy.mock.calls.at(-1)[0]).toEqual(
      RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
    )
  })

  test('게임에 참여한 자동차 중에 중복된 이름이 있는 경우, 에러가 발생한다.', () => {
    // Given
    const duplicatedCarNames = 'sonny, sonny'

    // When
    new RacingCarGame(duplicatedCarNames)

    //Then
    expect(logSpy.mock.calls.at(-1)?.[0]).toEqual(
      GAME_ERROR_MESSAGE.DUPLICATED_NAMES
    )
  })
})
