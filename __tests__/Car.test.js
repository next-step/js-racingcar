import { Car } from '../src/car'
import { ERROR_MESSAGE } from '../src/constants'

describe('Car - Feature', () => {
  let logSpy
  const CAR_NAME = 'son'

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  test('자동차는 이름을 가질 수 있다.', () => {
    // Given, When
    const car = new Car(CAR_NAME)

    // Then
    expect(car.getName()).toBe(CAR_NAME)
  })

  test('자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.', () => {
    // Given
    const car = new Car(CAR_NAME)

    // When
    car.run(4)

    // Then
    expect(car.getPosition()).toBe(1)
  })

  test('자동차는 랜덤 숫자가 4 미만이면 정지한다.', () => {
    // Given
    const car = new Car(CAR_NAME)

    // When
    car.run(3)

    // Then
    expect(car.getPosition()).toBe(0)
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

describe('Car - Validate', () => {
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

  test('자동차의 이름에 직접 접근하는 경우, 이름에 직접 접근할 수 없다는 에러가 발생한다.', () => {
    // Given
    const CAR_NAME = 'son'

    // When, Then
    expect(() => {
      new Car(CAR_NAME).name
    }).toThrow(new Error(ERROR_MESSAGE.NOT_ACCESS_NAME))
  })

  test('자동차의 이름을 직접 할당하는 경우, 이름을 직접 할당할 수 없다는 에러가 발생한다.', () => {
    // Given
    const CAR_NAME = 'son'
    const NEW_CAR_NAME = 'son2'

    // When, Then
    expect(() => {
      new Car(CAR_NAME).name = NEW_CAR_NAME
    }).toThrow(new Error(ERROR_MESSAGE.NOT_ASSIGN_NAME))
  })

  test('자동차의 포지션에 직접 접근하는 경우, 포지션에 직접 접근할 수 없다는 에러가 발생한다.', () => {
    // Given
    const CAR_NAME = 'son'

    // When, Then
    expect(() => {
      new Car(CAR_NAME).position
    }).toThrow(new Error(ERROR_MESSAGE.NOT_ACCESS_POSITION))
  })

  test('자동차의 포지션을 직접 할당하는 경우, 포지션을 직접 할당할 수 없다는 에러가 발생한다.', () => {
    // Given
    const CAR_NAME = 'son'
    const NEW_CAR_POSITION = 2

    // When, Then
    expect(() => {
      new Car(CAR_NAME).position = NEW_CAR_POSITION
    }).toThrow(new Error(ERROR_MESSAGE.NOT_ASSIGN_POSITION))
  })
})
