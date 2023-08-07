import { Car } from '../../src/components/Car'

describe('Car - Feature', () => {
  test('Car는 이름을 가질 수 있다.', () => {
    // Given, When
    const car = new Car('sonny')

    // Then
    expect(car.name).toBe('sonny')
  })

  test('Car는 앞으로 전진할 수 있다.', () => {
    // Given
    const car = new Car('sonny')

    // When
    car.run()

    // Then
    expect(car.position).toBe(1)
  })
})
