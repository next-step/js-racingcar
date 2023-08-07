import { Race } from '../../../src/domain/components/Race'

describe('Race', () => {
  let mockModel

  beforeEach(() => {
    mockModel = class {
      constructor(name) {
        this.name = name
        this.position = 0
      }

      run() {
        this.position = this.position + 1
      }
    }
  })

  test('Race는 전진 조건을 가지고 있다.', () => {
    // Given, When
    const runCondition = () => false
    const race = new Race({
      runCondition
    })

    // Then
    expect(race.runCondition).toEqual(runCondition)
  })

  test('Race는 경주의 참여자 목록을 가지고 있다.', () => {
    // Given, When
    const participants = [new mockModel('sonny'), new mockModel('son')]
    const race = new Race({
      participants
    })

    // Then
    expect(race.participants).toEqual(participants)
  })

  test('Race는 각 라운드마다 전진 조건에 해당하는 참여자를 이동시킬 수 있다.', () => {
    // Given
    const participants = [new mockModel('sonny'), new mockModel('son')]
    const race = new Race({
      participants
    })

    // When
    race.startRound()

    // Then
    const [first, second] = participants
    expect(first.position).toBe(1)
    expect(second.position).toBe(1)
  })
})
