import { Car } from '../../src/components/Car2'
import { Race } from '../../src/components/Race'
import {
  generateCarList,
  generateWinnerList,
  generateRace
} from '../../src/viewModel/getters'

describe('ViewModel/getters', () => {
  describe('generateCarList()', () => {
    test('문자열로 전달받은 carName을 기반으로 Car component를 생성한다.', () => {
      // Given
      const carNames = 'sonny, son'

      // When
      const carList = generateCarList(carNames)

      // Then
      expect(carList).toEqual([new Car('sonny'), new Car('son')])
    })
  })

  describe('generateWinnerList()', () => {
    test('전달받은 participants를 기반으로 우승자를 담은 배열을 반환한다.', () => {
      // Given
      const race = new Race({
        participants: [new Car('sonny'), new Car('son')],
        runCondition: car => car.name === 'sonny'
      })
      race.startRound()

      // When
      const winnerList = generateWinnerList(race.participants)

      // Then
      expect(winnerList).toEqual(['sonny'])
    })

    test('모든 참가자가 출발선에 있는 경우, 빈 배열을 반환한다.', () => {
      // Given
      const race = new Race({
        participants: [new Car('sonny'), new Car('son')],
        runCondition: () => false
      })
      race.startRound()

      // When
      const winnerList = generateWinnerList(race.participants)

      // Then
      expect(winnerList).toEqual([])
    })
  })

  describe('generateRace()', () => {
    test('전달받은 carList, runCondition을 기반으로 Race component를 생성한다.', () => {
      // Given
      const carList = [{ name: 'sonny' }, { name: 'son' }]
      const runCondition = () => true

      // When
      const race = generateRace({ carList, runCondition })

      expect(race).toEqual(new Race({ carList, runCondition }))
    })
  })
})
