import { Car } from '../src/car.js'
import { CarError } from '../src/errors/carError.js'

describe('자동차 이름 관련 테스트', () => {
  let name = ''

  beforeEach(() => {
    name = '자동차'
  })

  it('자동차는 이름을 상태로 가질 수 있다', () => {
    const car = new Car(name)

    expect(car.name).toBe(name)
  })

  it('이름을 입력하지 않으면 에러가 발생한다', () => {
    expect(() => new Car()).toThrow(CarError.InvalidName)
  })

  it('공백만 입력하면 에러가 발생한다', () => {
    name = '   '

    expect(() => new Car(name)).toThrow(CarError.InvalidName)
  })

  it('자동차 이름은 이름은 5자 이하만 가능하다', () => {
    const car = new Car(name)

    expect(car.name).toBe(name)
  })

  it('자동차 이름은 이름은 6자 이상 입력하면 에러가 발생한다', () => {
    name = '자동차자동차'

    expect(() => new Car(name)).toThrow(CarError.NameTooLong)
  })
})

describe('자동차 위치 값 관련 테스트', () => {
  let name = '자동차'

  beforeEach(() => {
    name = '자동차'
  })

  it('자동차는 위치 값을 가지며, 초기 상태는 0이다', () => {
    const car = new Car(name)

    expect(car.position).toBe(0)
  })
})

describe('전진하는 조건은 0에서 9 사이에서 무작위 값을 구한 후 무작위 값이 4 이상일 경우이다', () => {
  let name = '자동차'

  beforeEach(() => {
    name = '자동차'
  })

  it('무작위 값이 4 이상이면 전진한다', () => {
    const car = new Car(name)

    car.moveForward(4)

    expect(car.position).toBe(1)
  })

  it('무작위 값이 3 이하이면 전진하지 않는다', () => {
    const car = new Car(name)

    car.moveForward(3)

    expect(car.position).toBe(0)
  })
})