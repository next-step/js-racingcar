import { MUTATION_TYPE } from '../../src/constants/viewModel'
import { ConsoleView } from '../../src/view/ConsoleView'
import { View } from '../../src/view/View'

describe('View', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('update() - update시 type이 updateCarList인 경우, ConsoleView의 carList에 Model의 state를 담아 호출한다.', () => {
    // Given
    const context = { consoleView: new ConsoleView() }
    const carList = [
      { name: 'sonny', position: 1 },
      { name: 'son', position: 0 }
    ]

    // When
    View.prototype.update.call(context, {
      type: MUTATION_TYPE.SET_CAR_LIST,
      carList
    })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('\nsonny : -\nson : ')
  })

  test('update() - update시 type이 updateWinnerList인 경우, ConsoleView의 winnerList에 Model의 state를 담아 호출한다.', () => {
    // Given
    const context = { consoleView: new ConsoleView() }
    const winnerList = ['sonny', 'son']

    // When
    View.prototype.update.call(context, {
      type: MUTATION_TYPE.SET_WINNER_LIST,
      winnerList
    })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe(
      '\nsonny, son(이)가 최종 우승했습니다.'
    )
  })

  test('update() - update시 type이 error인 경우, ConsoleView의 error에 Model의 state를 담아 호출한다.', () => {
    // Given
    const context = {
      consoleView: new ConsoleView(),
      promptView: { update() {} }
    }

    // When
    View.prototype.update.call(context, {
      type: MUTATION_TYPE.SET_ERROR,
      error: 'error!!'
    })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('error!!')
  })
})
