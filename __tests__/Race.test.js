import Race from '../src/domain/Race.js'
import { TEST_CARS_INPUT, TEST_ROUND, TEST_ROUND_INPUT } from './constants/index.js'
import View from '../src/view/view.js'

describe('자동차 경주 테스트', () => {
  test('자동차 경주는 주어진 횟수 동안 경주가 진행된다.', async () => {
    // given
    let mockGetCarNames = jest.fn().mockResolvedValue(TEST_CARS_INPUT)
    let mockGetRound = jest.fn().mockResolvedValue(TEST_ROUND_INPUT)

    const cars = View.parsingCars(await mockGetCarNames())
    const round = View.parsingRound(await mockGetRound())

    const race = new Race(cars, round)

    // when
    race.start()
    const totalRound = race.getTotalRounds()

    // then
    expect(totalRound).toBe(TEST_ROUND)
  })
})
