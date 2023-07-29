import { Car } from '../src/car'
import { ERROR_MESSAGE } from '../src/constants'

describe('자동차 1차 요구사항', () => {
  const DEFAULT_NAME = 'son'

  test('자동차는 이름을 가질 수 있다.', () => {
    // Given, When
    const car = new Car(DEFAULT_NAME)

    // Then
    expect(car.getName()).toBe(DEFAULT_NAME)
  })

  test('자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.', () => {
    // Given
    const car = new Car(DEFAULT_NAME)

    // When
    car.run(4)

    // Then
    expect(car.getPosition()).toBe(1)
  })

  test('자동차는 랜덤 숫자가 4 미만이면 정지한다.', () => {
    // Given
    const car = new Car(DEFAULT_NAME)

    // When
    car.run(3)

    // Then
    expect(car.getPosition()).toBe(0)
  })
})

describe('자동차 2차 요구사항', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('자동차의 이름이 5자 이상의 문자열인 경우, 5자 이내의 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const OVER_CAR_NAME = 'sonny'

    // When, Then
    expect(() => {
      new Car(OVER_CAR_NAME)
    }).toThrow(new Error(ERROR_MESSAGE.OVER_NAME_MAX_LENGTH))
  })

  test('자동차의 이름이 빈 문자열인 경우, 최소 1자 이상의 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const EMPTY_CAR_NAME = ''

    // When, Then
    expect(() => {
      new Car(EMPTY_CAR_NAME)
    }).toThrow(new Error(ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH))
  })

  test('자동차의 이름이 숫자인 경우, 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const INVALID_CAR_NAME = 123

    // When, Then
    expect(() => {
      new Car(INVALID_CAR_NAME)
    }).toThrow(new Error(ERROR_MESSAGE.INVALID_NAME_TYPE))
  })

  test('자동차의 이름이 정의되지 않은 경우, 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const INVALID_CAR_NAME = undefined

    // When, Then
    expect(() => {
      new Car(INVALID_CAR_NAME)
    }).toThrow(new Error(ERROR_MESSAGE.INVALID_NAME_TYPE))
  })

  test('자동차는 전진할 때, 자동차의 이름을 같이 출력한다.', () => {
    // Given
    const CAR_NAME = 'son'
    const car = new Car(CAR_NAME)

    // When
    car.run(4)

    // Then
    expect(car.getPosition()).toBe(1)
    expect(logSpy.mock.calls[0][0]).toBe(CAR_NAME)
  })
})
