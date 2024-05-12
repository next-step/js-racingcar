import Car from '../src/domain/Car.js'
import {
  MINIMUM_CAR_NAME_LENGTH,
  MAXIMUM_CAR_NAME_LENGTH,
  MINIMUM_RANDOM_VALUE,
  MAXIMUM_RANDOM_VALUE,
} from '../src/constants/index.js'

let car

beforeEach(() => {
  car = new Car('car1')
})

describe('자동차 기능 테스트', () => {
  test('자동차는 1자 이상, 5자 이하의 이름을 갖는다.', () => {
    // given

    // when
    const name = car.name

    // then
    expect(name.length).toBeLessThanOrEqual(MAXIMUM_CAR_NAME_LENGTH)
    expect(name.length).toBeGreaterThanOrEqual(MINIMUM_CAR_NAME_LENGTH)
  })

  test('무작위 값은 0이상 9이하의 값이 생성된다.', () => {
    // given

    // when
    const getRandomValue = car.getRandomValue()

    // then
    expect(getRandomValue).toBeGreaterThanOrEqual(MINIMUM_RANDOM_VALUE)
    expect(getRandomValue).toBeLessThanOrEqual(MAXIMUM_RANDOM_VALUE)
  })

  test('무작위 값이 4 이상일 경우, 1 전진한다.', () => {
    // given
    const getRandomValue = jest.fn().mockReturnValue(5)
    const isCarMovable = car.isCarMovable(getRandomValue())

    // when
    if (isCarMovable) car.moveForward()

    // then
    expect(car.position).toBe(1)
  })

  test('무작위 값이 4 미만일 경우, 정지한다.', () => {
    // given
    const getRandomValue = jest.fn().mockReturnValue(3)
    const isCarMovable = car.isCarMovable(getRandomValue())

    // when
    if (isCarMovable) car.moveForward()

    // then
    expect(car.position).toBe(0)
  })
})
