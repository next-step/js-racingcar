import { CAR_ERROR_MESSAGE, MAX_NAME_LENGTH } from '../src/constants/car'
import {
  CAR_RACE_CONSTRUCTOR_NAME,
  DEFAULT_MAX_MATCH_LENGTH,
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE
} from '../src/constants/RacingCarList'
import { RacingCarList } from '../src/RacingCarList'

describe('RacingCarList - Feature', () => {
  test('자동차 이름을 쉼표로 구분할 수 있다.', () => {
    // Given
    const racingCarList = new RacingCarList()

    // When
    racingCarList.init({
      carNames: 'sonny, son1, son2',
      maxMatchLength: DEFAULT_MAX_MATCH_LENGTH
    })

    // Then
    expect(racingCarList.getCarList().length).toBe(3)
  })

  test('경주가 시작될 때, 경주에 참여한 자동차들을 최대 경기 횟수 동안 앞으로 전진시킨다.', () => {
    // Given
    const racingCarList = new RacingCarList()
    racingCarList.init({ carNames: 'sonny, son1, son2' })

    // When

    racingCarList.startRound()

    // Then
    expect(racingCarList.getPositionOf('sonny')).toBe(1)
    expect(racingCarList.getPositionOf('son1')).toBe(1)
    expect(racingCarList.getPositionOf('son2')).toBe(1)
  })

  test('경주의 전진 조건이 있는 경우, 해당 조건이 있는 자동차만 앞으로 전진 시킨다.', () => {
    // Given
    const racingCarList = new RacingCarList()
    racingCarList.init({
      carNames: 'sonny, son1, son2',
      runCondition: participant => participant.getName() === 'sonny'
    })

    // When
    racingCarList.startRound()

    // Then
    expect(racingCarList.getPositionOf('sonny')).toBe(1)
    expect(racingCarList.getPositionOf('son1')).toBe(0)
    expect(racingCarList.getPositionOf('son2')).toBe(0)
  })

  test('경주의 한 라운드가 끝날 때마다 전달받은 onEndRound 함수에 경주에 참여한 자동차 목록을 인자로 넣어 호출한다.', () => {
    // Given
    const handleEndRound = jest.fn()
    const racingCarList = new RacingCarList()
    racingCarList.init({
      carNames: 'sonny, son1, son2',
      runCondition: participant => participant.getName() === 'sonny',
      onEndRound: handleEndRound
    })

    // When
    racingCarList.startRound()

    // Then
    expect(handleEndRound).toBeCalledWith(racingCarList.getCarList())
  })

  test('경주의 최대 경기 횟수를 정할 수 있다.', () => {
    // Given
    const racingCarList = new RacingCarList()

    // When
    racingCarList.init({
      carNames: 'sonny, son1, son2',
      maxMatchLength: DEFAULT_MAX_MATCH_LENGTH
    })

    // Then
    expect(racingCarList.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주의 최대 경기 횟수가 정의되지 않은 경우, 5회로 지정한다.', () => {
    // Given
    const racingCarList = new RacingCarList()

    // When
    racingCarList.init({ carNames: 'sonny, son1, son2' })

    // Then
    expect(racingCarList.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주에 참여한 자동차들의 목록을 출력할 수 있다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const racingCarList = new RacingCarList()

    // When
    racingCarList.init({ carNames })

    //Then
    const carList = racingCarList.getCarList().map(car => car.getName())
    expect(carList).toEqual(['sonny', 'son1', 'son2'])
  })

  test('경주가 끝난 뒤, 경주에 우승한 자동차를 출력할 수 있다.', () => {
    // Given
    const racingCarList = new RacingCarList()
    racingCarList.init({ carNames: 'sonny, son1, son2', maxMatchLength: 2 })

    // When
    racingCarList.startRound()
    racingCarList.startRound()

    // Then
    expect(racingCarList.getWinners()).toEqual(['sonny', 'son1', 'son2'])
  })
})

describe('RacingCarList - Validate', () => {
  test('경주의 최대 경기 횟수가 숫자가 아니며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const racingCarList = new RacingCarList()
    racingCarList.subscribeError(errorTracker)

    // When
    racingCarList.init({
      carNames: 'sonny, son1, son2',
      maxMatchLength: null
    })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH
      }
    })
  })

  test('경주의 최대 경기 횟수 이상으로 라운드를 진행시키며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const racingCarList = new RacingCarList()
    racingCarList.subscribeError(errorTracker)

    racingCarList.init({
      carNames: 'sonny, son1, son2',
      maxMatchLength: 3
    })

    // When
    racingCarList.startRound()
    racingCarList.startRound()
    racingCarList.startRound()
    racingCarList.startRound()

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH
      }
    })
  })

  test('경주에 참여한 자동차가 한 대이며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const racingCarList = new RacingCarList()
    racingCarList.subscribeError(errorTracker)

    // When
    racingCarList.init({
      carNames: 'sonny',
      maxMatchLength: null
    })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH)
      }
    })
  })

  test('경주에 참여한 자동차의 이름이 5자 이상이며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const racingCarList = new RacingCarList()
    racingCarList.subscribeError(errorTracker)

    // When
    racingCarList.init({
      carNames: 'sonny2,sonny3',
      maxMatchLength: 5
    })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_RACE_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH)
      }
    })
  })
})
