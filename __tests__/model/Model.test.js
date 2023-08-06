import { Model } from '../../src/model/Model'

describe('Model', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  test('Model의 상태가 변경된 경우, 상태 변화를 감지할 수 있다.', () => {
    // Given
    const spy = () => console.log('changed state!')
    const model = new Model()
    model.subscribe(spy)

    // When
    model.setState({})

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('changed state!')
  })

  test('Model의 carList를 변경할 수 있다.', () => {
    // Given
    const model = new Model()

    // When
    model.setState({
      carList: ['sonny']
    })

    // Then
    const { carList } = model.getState()
    expect(carList).toEqual(['sonny'])
  })

  test('Model의 Winners를 변경할 수 있다.', () => {
    // Given
    const model = new Model()

    // When
    model.setState({
      winners: ['sonny', 'son']
    })

    // Then
    const { winners } = model.getState()
    expect(winners).toEqual(['sonny', 'son'])
  })
})
