import { Race } from '../src/race.js'
import { Car } from '../src/car.js'

describe('자동차 경주 관련 테스트', () => {
  let cars
  let round = 1

  beforeEach(() => {
    cars = [new Car('자동차 1'), new Car('자동차 2')]
  })

  it('경주 횟수를 입력받을 수 있다', () => {
    const race = new Race(cars, 5)
    expect(race.round).toBe(5)
  })

  it('여러 자동차를 등록하여 관리한다', () => {
    const race = new Race(cars, round)

    expect(race.cars).toEqual(cars)
  })

  it('한 턴이 지나면 모든 자동차는 1칸 전진한다', () => {
    const race = new Race(cars, round)

    race.playTurn()

    cars.forEach(({ position }) => {
      expect(position).toBe(1)
    })
  })

  it('경주 종료 후 가장 멀리 간 자동차를 우승자로 판별한다 (우승자 1명)', () => {
    cars = [new Car('자동차 1', 1), new Car('자동차 2', 2)]
    const race = new Race(cars, round)

    expect(race.getWinnerNames()).toEqual(['자동차 2'])
  })

  it('경주 종료 후 가장 멀리 간 자동차를 우승자로 판별한다 (우승자 2명)', () => {
    cars = [new Car('자동차 1', 1), new Car('자동차 2', 1)]
    const race = new Race(cars, round)

    expect(race.getWinnerNames()).toEqual(['자동차 1', '자동차 2'])
  })
})