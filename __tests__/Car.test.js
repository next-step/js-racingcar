import Car from '../src'

const CAR_NAME = '산들'

describe('자동차', () => {
  let car

  beforeEach(() => {
    car = new Car(CAR_NAME)
  })
  it('자동차는 이름을 가질 수 있다.', () => {
    expect(car.getName()).toEqual(CAR_NAME)
  })

  it('자동차는 랜덤 숫자가 4 이상이면 앞으로 전진한다.', () => {
    for (let move = 1; move <= 3; move++) {
      car.move(4)
      expect(car.getPosition()).toEqual(move)
    }
  })

  it('자동차는 랜덤숫자가 4 미만이면 정지한다.', () => {
    car.move(3)
    expect(car.getPosition()).toEqual(0)
  })
})
