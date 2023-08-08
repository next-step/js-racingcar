import { ConsoleView } from '../../src/view/ConsoleView'

describe('ConsoleView', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renderCarList() - 전달받은 carList를 기반으로 name과 position을 출력한다.', () => {
    // Given
    const carList = [
      { name: 'sonny', position: 1 },
      { name: 'son', position: 0 }
    ]

    // When
    ConsoleView.prototype.renderCarList.call({}, { carList })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('\nsonny : -\nson : ')
  })

  test('renderWinnerList() - 전달받은 winnerList를 기반으로 우승자를 출력한다.', () => {
    // Given
    const winnerList = ['sonny', 'son']

    // When
    ConsoleView.prototype.renderWinnerList.call({}, { winnerList })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe(
      '\nsonny, son(이)가 최종 우승했습니다.'
    )
  })
  test('renderWinnerList() - 전달받은 winnerList가 빈 배열인 경우, 우승자가 없다는 메시지를 출력한다.', () => {
    // Given
    const winnerList = []

    // When
    ConsoleView.prototype.renderWinnerList.call({}, { winnerList })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('\n우승자가 없습니다!')
  })
})
