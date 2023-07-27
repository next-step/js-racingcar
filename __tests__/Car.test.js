import { Car, RaceTrack } from '../src/models'
import { makeRandomNum } from '../src/utils'

const CAR_NAME = '산들'
const CAR_NAME_ARR = ['산들', '뿌꾸']

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

describe('자동차 경주', () => {
  let raceTrack

  beforeEach(() => {
    const car1 = new Car(CAR_NAME_ARR[0])
    const car2 = new Car(CAR_NAME_ARR[1])

    raceTrack = new RaceTrack([car1, car2])
  })

  it('자동차 경주를 5회 진행한다.', () => {
    raceTrack.race()
    expect(raceTrack.turnCount).toBe(5)
  })
  it('자동차 경주를 할 때 0 ~ 9 까지 랜덤 숫자를 부여해 전진 여부를 결정한다.', () => {
    const testCount = 100

    for (let i = 0; i < testCount; i++) {
      const score = makeRandomNum()
      expect(score >= 0 && score <= 9).toBe(true)
    }
  })
  it('자동차 경주 게임 후 우승자를 가려낸다. (우승 자동차는 여러대일 수 있다.)', () => {
    raceTrack.race()
    const winners = raceTrack.winners
    expect(CAR_NAME_ARR).toEqual(expect.arrayContaining(winners))
  })
})
