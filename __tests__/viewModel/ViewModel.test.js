import { Car } from '../../src/components/Car2'
import { MUTATION_TYPE } from '../../src/constants/viewModel'
import { Observable } from '../../src/utils/Observable'
import { ViewModel } from '../../src/viewModel/ViewModel'

describe('ViewModel', () => {
  let logSpy
  let MockModel

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log')
    MockModel = class extends Observable {
      constructor() {
        super()
        this.state = {
          carList: [],
          maxMatchLength: 5,
          winnerList: [],
          runCondition: () => true
        }
      }

      getState() {
        return this.state
      }

      setState(state) {
        this.state = { ...this.state, ...state }
        this.notify(state)
      }
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('handleAction() - 외부에서 입력받은 액션이 ready인 경우, ready 메서드를 실행시킨다.', () => {
    // Given
    jest
      .spyOn(ViewModel.prototype, 'ready')
      .mockImplementationOnce(() => console.log('toBeCalled ready'))
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)

    // When
    viewModel.handleAction({ type: 'ready' })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('toBeCalled ready')
  })

  test('handleAction() - 외부에서 입력받은 액션이 start인 경우, start 메서드를 실행시킨다.', () => {
    // Given
    jest
      .spyOn(ViewModel.prototype, 'start')
      .mockImplementationOnce(() => console.log('toBeCalled start'))
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)

    // When
    viewModel.handleAction({ type: 'start' })

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('toBeCalled start')
  })

  test('handleMutation() - 전달받은 state로 ViewModel의 state와 Model의 state를 업데이트 한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)

    // When
    viewModel.handleMutation({
      type: MUTATION_TYPE.CAR_LIST,
      carList: ['sonny']
    })

    // Then
    expect(viewModel.state.carList).toEqual(['sonny'])
    expect(mockModel.getState().carList).toEqual(['sonny'])
  })

  test('start() - Race의 라운드를 진행시키고 라운드가 진행될 때마다 Model에 현재 carList를 전달한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.ready({ carNames: 'sonny, son', maxMatchLength: 3 })

    // When
    viewModel.start()

    // Then
    expect(mockModel.getState().carList).toEqual([
      new Car('sonny'),
      new Car('son')
    ])
  })

  test('start() - Race가 모두 종료되고 Model에 winnerList를 전달한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.ready({ carNames: 'sonny, son', maxMatchLength: 3 })

    // When
    viewModel.start()

    // Then
    expect(mockModel.getState().winnerList).toEqual(['sonny', 'son'])
  })

  test('update() - update시, 구독하고 있는 요소에게 ViewModel의 state를 전달한다.', () => {
    // Given
    const spy = state => console.log(state.mock)
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.handleMutation({ mock: 'mock' })
    viewModel.subscribe(spy)

    // When
    viewModel.update()

    // Then
    expect(logSpy.mock.calls[0][0]).toBe('mock')
  })

  test('destroy() - ViewModel은 destroy 이후 update를 호출한 경우, 상태를 전달받을 수 없다.', () => {
    // Given
    const spy = state => console.log(state.mock)
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.handleMutation({ mock: 'mock' })
    viewModel.subscribe(spy)

    // When
    viewModel.destroy()
    viewModel.update()

    // Then
    expect(logSpy.mock.calls.length).toBe(0)
  })
})
