import {
  CAR_ERROR_MESSAGE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH
} from '../src/constants/car'
import { Car } from '../src/car'

describe('Car - Feature', () => {
  let logSpy
  const carName = 'son'

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('자동차는 이름을 가질 수 있다.', () => {
    // Given, When
    const car = new Car(carName)

    // Then
    expect(car.getName()).toBe(carName)
  })

  test('자동차는 앞으로 전진할 수 있다.', () => {
    // Given
    const car = new Car(carName)

    // When
    car.run()

    // Then
    expect(car.getPosition()).toBe(1)
  })

  test('자동차는 전진할 때, 자동차의 이름과 포지션을 같이 출력한다.', () => {
    // Given
    const carName = 'son'
    const car = new Car(carName)

    // When
    car.run()

    // Then
    expect(car.getPosition()).toBe(1)
    expect(logSpy.mock.calls[0][0]).toBe(`${carName}: -`)
  })
})

describe('Car - Validate', () => {
  test('자동차의 이름이 6자 이상의 문자열인 경우, 5자 이하의 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const overCarName = 'sonny2'

    // When, Then
    expect(() => {
      new Car(overCarName)
    }).toThrow(
      new Error(CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH))
    )
  })

  test('자동차의 이름이 빈 문자열인 경우, 최소 1자 이상의 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const emptyCarName = ''

    // When, Then
    expect(() => {
      new Car(emptyCarName)
    }).toThrow(
      new Error(CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(MIN_NAME_LENGTH))
    )
  })

  test('자동차의 이름이 숫자인 경우, 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const inValidCarName = 123

    // When, Then
    expect(() => {
      new Car(inValidCarName)
    }).toThrow(new Error(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE))
  })

  test('자동차의 이름이 정의되지 않은 경우, 문자열만 가능하다는 에러가 발생한다.', () => {
    // Given
    const inValidCarName = undefined

    // When, Then
    expect(() => {
      new Car(inValidCarName)
    }).toThrow(new Error(CAR_ERROR_MESSAGE.INVALID_NAME_TYPE))
  })
})
