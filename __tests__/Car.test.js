import { Car } from '../src/car'

describe('자동차 1차 요구사항', () => {
  const DEFAULT_NAME = 'sonny'

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
