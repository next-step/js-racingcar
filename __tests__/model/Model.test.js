import { Model } from '../../src/model/Model'

describe('Model', () => {
  let logSpy

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Model은 carList를 가질 수 있다.', () => {
    // Given, When
    const model = new Model()

    // Then
    expect(model.getState()).toHaveProperty('carList')
  })

  test('Model은 winnerList를 가질 수 있다.', () => {
    // Given, When
    const model = new Model()

    // Then
    expect(model.getState()).toHaveProperty('winnerList')
  })

  test('Model은 runCondition을 가질 수 있다.', () => {
    // Given, When
    const model = new Model()

    // Then
    expect(model.getState()).toHaveProperty('runCondition')
  })

  test('Model은 maxMatchLength를 가질 수 있다.', () => {
    // Given, When
    const model = new Model()

    // Then
    expect(model.getState()).toHaveProperty('maxMatchLength')
  })

  test('Model의 상태가 변경된 경우, 상태 변화를 감지할 수 있다.', () => {
    // Given
    const spy = () => console.log('changed state!')
    const model = new Model()
    model.subscribe(spy)

    // When
    model.setCarList(['sonny'])

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('changed state!')
  })

  test('Model의 carList를 변경할 수 있다.', () => {
    // Given
    const model = new Model()

    // When
    model.setCarList(['sonny'])

    // Then
    const { carList } = model.getState()
    expect(carList).toEqual(['sonny'])
  })

  test('Model의 winnerList를 변경할 수 있다.', () => {
    // Given
    const model = new Model()

    // When
    model.setWinnerList(['sonny', 'son'])

    // Then
    const { winnerList } = model.getState()
    expect(winnerList).toEqual(['sonny', 'son'])
  })

  test('Model의 maxMatchLength를 변경할 수 있다.', () => {
    // Given
    const model = new Model()

    // When
    model.setMaxMatchLength(10)

    // Then
    const { maxMatchLength } = model.getState()
    expect(maxMatchLength).toEqual(10)
  })
})
