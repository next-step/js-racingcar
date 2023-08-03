import {
  CAR_CONSTRUCTOR_NAME,
  CAR_ERROR_MESSAGE,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH
} from '../src/constants/car'
import { Car } from '../src/car'

describe('Car - Feature', () => {
  const carName = 'son'

  test('자동차는 이름을 가질 수 있다.', () => {
    // Given
    const car = new Car()

    // When
    car.init({ name: carName })

    // Then
    expect(car.getName()).toBe(carName)
  })

  test('자동차는 앞으로 전진할 수 있다.', () => {
    // Given
    const car = new Car()
    car.init({ name: carName })

    // When
    car.run()

    // Then
    expect(car.getPosition()).toBe(1)
  })

  test('자동차는 전진할 때, 전달받은 onRun 함수를 호출한다.', () => {
    // Given
    const carName = 'son'
    const handleRun = jest.fn()
    const car = new Car()
    car.init({ name: carName, onRun: handleRun })

    // When
    car.run()

    // Then
    expect(car.getPosition()).toBe(1)
    expect(handleRun).toBeCalled()
  })
})

describe('Car - Validate', () => {
  test('자동차의 이름이 6자 이상의 문자열이며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const car = new Car()
    car.subscribeError(errorTracker)

    // When
    car.init({ name: 'sonny2' })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.OVER_NAME_MAX_LENGTH(MAX_NAME_LENGTH)
      }
    })
  })

  test('자동차의 이름이 빈 문자열이며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const car = new Car()
    car.subscribeError(errorTracker)

    // When
    car.init({ name: '' })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(MIN_NAME_LENGTH)
      }
    })
  })

  test('자동차의 이름이 숫자이며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const car = new Car()
    car.subscribeError(errorTracker)

    // When
    car.init({ name: 123 })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      }
    })
  })

  test('자동차의 이름이 정의되지 않았으며 에러를 구독하고 있는 경우, 구독된 함수에 에러 정보를 담아 호출한다.', () => {
    // Given
    const errorTracker = jest.fn()
    const car = new Car()
    car.subscribeError(errorTracker)

    // When
    car.init({ name: undefined })

    // Then
    expect(errorTracker).toBeCalledWith({
      error: {
        cause: CAR_CONSTRUCTOR_NAME,
        message: CAR_ERROR_MESSAGE.INVALID_NAME_TYPE
      }
    })
  })
})
