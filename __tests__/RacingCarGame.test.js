import { GAME_ERROR_MESSAGE } from '../src/constants/racingCarGame'
import * as number from '../src/utils/number'
import { Car } from '../src/car'
import { RacingCarGame } from '../src/racingCarGame'

const mockRunOnlyFirstCar = () => {
  let runCount = 0

  jest
    .spyOn(number, 'getRandomNumber')
    .mockImplementation(() => (runCount++ % 3 === 0 ? 5 : 0))
}

describe('RacingCarGame - Feature', () => {
  let logSpy
  const carNames = 'sonny, son, son2'

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('자동차 이름을 쉼표로 구분할 수 있다.', () => {
    // Given, When
    const racingCarGame = new RacingCarGame(carNames)

    // Then
    const cars = ['sonny', 'son', 'son2'].map(name => new Car(name))
    expect(racingCarGame.getParticipants()).toEqual(cars)
  })

  test('자동차가 전진할 때, 자동차의 현재 위치와 이름을 같이 출력한다.', () => {
    // Given
    jest.spyOn(number, 'getRandomNumber').mockImplementation(() => 5)
    const racingCarGame = new RacingCarGame(carNames)

    // When
    racingCarGame.start()

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('sonny: -')
  })

  test('게임이 완료된 후, 누가 우승했는지 알려주며 우승자가 여러명인 경우, 쉼표로 구분하여 알려준다.', () => {
    // Given
    jest.spyOn(number, 'getRandomNumber').mockImplementation(() => 5)
    const racingCarGame = new RacingCarGame(carNames)

    // When
    racingCarGame.start()

    // Then
    expect(logSpy.mock.calls.at(-1)[0]).toBe(`우승자: ${carNames}`)
  })

  test('게임에서 sonny가 가장 많이 앞서나갔을 경우, 게임이 완료되었을 때 sonny가 우승했는지 알려준다.', () => {
    // Given
    mockRunOnlyFirstCar()
    const racingCarGame = new RacingCarGame(carNames)

    // When
    racingCarGame.start()

    // Then
    expect(logSpy.mock.calls.at(-1)[0]).toEqual('우승자: sonny')
  })

  test('게임을 초기화할 수 있다.', () => {
    // Given
    const racingCarGame = new RacingCarGame(carNames)

    // When
    racingCarGame.start()
    racingCarGame.reset()

    // Then
    expect(racingCarGame.getParticipants()).toEqual([])
    expect(racingCarGame.getWinners()).toEqual([])
  })

  test('게임에 참여한 자동차 목록을 수정할 수 있다.', () => {
    // Given
    const newCarNames = 'son3, son4, son5'
    const racingCarGame = new RacingCarGame(carNames)

    // When
    racingCarGame.reset()
    racingCarGame.setParticipants(newCarNames)

    // Then
    const newCars = ['son3', 'son4', 'son5'].map(name => new Car(name))
    expect(racingCarGame.getParticipants()).toEqual(newCars)
  })
})

describe('RacingCarGame - Error', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('사용자가 잘못된 입력 값을 작성한 경우, "오류로 인해 게임이 종료되었습니다!"라는 에러 메시지 출력과 함께 프로그램을 종료한다.', () => {
    // Given
    const inValidCarNames = null

    // When
    new RacingCarGame(inValidCarNames)

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
      GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR
    )
  })

  test('초기화 이후, 게임을 시작하는 경우, 에러 메시지 출력과 함께 프로그램을 종료한다.', () => {
    // Given
    const racingCarGame = new RacingCarGame('sonny, son, son2')

    // When
    racingCarGame.reset()
    racingCarGame.start()

    //Then
    expect(logSpy.mock.calls.at(-1)[0]).toEqual(
      GAME_ERROR_MESSAGE.GAME_TERMINATE_OF_ERROR
    )
  })
})
