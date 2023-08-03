import {
  DEFAULT_MAX_MATCH_LENGTH,
  MIN_PARTICIPANTS_LENGTH,
  RACE_ERROR_MESSAGE
} from '../src/constants/carRace'
import { Car } from '../src/car'
import { CarRace } from '../src/carRace'

const generateCar = names =>
  names.split(',').map(name => new Car({ name: name.trim() }))

describe('CarRace - Feature', () => {
  test('자동차 이름을 쉼표로 구분할 수 있다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'

    // When
    const carRace = new CarRace({
      carNames,
      maxMatchLength: DEFAULT_MAX_MATCH_LENGTH
    })

    // Then
    expect(carRace.getCars().length).toBe(3)
  })

  test('경주가 시작될 때, 경주에 참여한 자동차들을 최대 경기 횟수 동안 앞으로 전진시킨다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const carRace = new CarRace({ carNames })

    // When
    carRace.startRound()

    // Then
    expect(carRace.getPositionOf('sonny')).toBe(1)
    expect(carRace.getPositionOf('son1')).toBe(1)
    expect(carRace.getPositionOf('son2')).toBe(1)
  })

  test('경주의 전진 조건이 있는 경우, 해당 조건이 있는 자동차만 앞으로 전진 시킨다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const runCondition = participant => participant.getName() === 'sonny'
    const carRace = new CarRace({
      carNames,
      runCondition
    })

    // When
    carRace.startRound()

    // Then
    expect(carRace.getPositionOf('sonny')).toBe(1)
    expect(carRace.getPositionOf('son1')).toBe(0)
    expect(carRace.getPositionOf('son2')).toBe(0)
  })

  test('경주의 한 라운드가 끝날 때마다 전달받은 onEndRound 함수에 경주에 참여한 자동차 목록을 인자로 넣어 호출한다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const runCondition = participant => participant.getName() === 'sonny'
    const handleEndRound = jest.fn()

    const carRace = new CarRace({
      carNames,
      runCondition,
      onEndRound: handleEndRound
    })

    // When
    carRace.startRound()

    // Then
    expect(handleEndRound).toBeCalledWith(carRace.getCars())
  })

  test('경주의 최대 경기 횟수를 정할 수 있다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'

    // When
    const carRace = new CarRace({
      carNames,
      maxMatchLength: DEFAULT_MAX_MATCH_LENGTH
    })

    // Then
    expect(carRace.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주의 최대 경기 횟수가 정의되지 않은 경우, 5회로 지정한다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'

    // When
    const carRace = new CarRace({ carNames })

    // Then
    expect(carRace.getMaxMatchLength()).toBe(DEFAULT_MAX_MATCH_LENGTH)
  })

  test('경주에 참여한 자동차들의 목록을 출력할 수 있다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const carRace = new CarRace({ carNames })

    // When, Then
    const cars = generateCar(carNames)
    expect(carRace.getCars()).toEqual(cars)
  })

  test('경주가 끝난 뒤, 경주에 우승한 자동차를 출력할 수 있다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const carRace = new CarRace({ carNames, maxMatchLength: 2 })

    // When
    carRace.startRound()
    carRace.startRound()

    // Then
    expect(carRace.getWinners()).toEqual(['sonny', 'son1', 'son2'])
  })
})

describe('CarRace - Validate', () => {
  test('경주의 최대 경기 횟수가 숫자가 아닌 경우, 에러가 발생한다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'

    // When, Then
    expect(() => {
      new CarRace({
        carNames,
        maxMatchLength: null
      })
    }).toThrow(new Error(RACE_ERROR_MESSAGE.NOT_VALID_MATCH_LENGTH))
  })

  test('경주의 최대 경기 횟수 이상으로 라운드를 진행시키는 경우, 에러가 발생한다.', () => {
    // Given
    const carNames = 'sonny, son1, son2'
    const carRace = new CarRace({
      carNames,
      maxMatchLength: 3
    })

    // When, Then
    expect(() => {
      carRace.startRound()
      carRace.startRound()
      carRace.startRound()
      carRace.startRound()
    }).toThrow(new Error(RACE_ERROR_MESSAGE.OVER_MATCH_MAX_LENGTH))
  })

  test('경주에 참여한 자동차가 한 대인 경우, 에러가 발생한다.', () => {
    // Given
    const carNames = 'car'

    // When, Then
    expect(() => {
      new CarRace({
        carNames
      })
    }).toThrow(
      new Error(RACE_ERROR_MESSAGE.LACK_PARTICIPANTS(MIN_PARTICIPANTS_LENGTH))
    )
  })
})
