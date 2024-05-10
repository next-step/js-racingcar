import Car from '../src/domain/Car.js'
import { MINIMUM_CAR_NAME_LENGTH, MAXIMUM_CAR_NAME_LENGTH } from '../src/constants/index.js'
/**
## 자동차
- [x] 자동차는 5자 이하의 이름을 갖는다.
- [x] 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우, 전진한다
 */

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
