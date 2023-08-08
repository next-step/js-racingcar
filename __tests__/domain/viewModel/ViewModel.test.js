import { Car } from '../../../src/domain/components/Car'
import { ACTION_TYPE } from '../../../src/constants/viewModel'
import { Observable } from '../../../src/utils/Observable'
import { ViewModel } from '../../../src/domain/viewModel/ViewModel'
import { CAR, CAR_ERROR_MESSAGE } from '../../../src/constants/components/car'

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

  test('handleAction() - 외부에서 입력받은 state값이 올바르지 않은 경우, error를 설정하는 뮤테이션을 시켜 state를 변경한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)

    // When
    viewModel.handleAction({ type: ACTION_TYPE.CHANGE_STEP })

    // Then
    expect(viewModel.getState().error).toEqual(
      new Error(CAR_ERROR_MESSAGE.UNDER_NAME_MIN_LENGTH(CAR.MIN_NAME_LENGTH))
    )
  })

  test('handleAction() - 외부에서 입력받은 state값이 올바른 경우, 액션에 해당하는 뮤테이션을 시켜 state를 변경한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)

    // When
    viewModel.handleAction({
      type: ACTION_TYPE.CHANGE_STEP,
      payload: {
        carNames: 'sonny, son',
        maxMatchLength: 5,
        step: 2
      }
    })

    // Then
    expect(viewModel.getState().carNames).toEqual('sonny, son')
  })

  test('start() - Race의 라운드를 진행시키고 라운드가 진행될 때마다 Model에 현재 carList를 전달한다.', () => {
    // Given
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.handleAction({
      type: ACTION_TYPE.CHANGE_STEP,
      payload: {
        carNames: 'sonny, son',
        maxMatchLength: 5
      }
    })

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
    viewModel.handleAction({
      type: ACTION_TYPE.CHANGE_STEP,
      payload: {
        carNames: 'sonny, son',
        maxMatchLength: 3
      }
    })

    // When
    viewModel.start()

    // Then
    expect(mockModel.getState().winnerList).toEqual(['sonny', 'son'])
  })

  test('update() - update시, 구독하고 있는 요소에게 ViewModel의 state를 전달한다.', () => {
    // Given
    const spy = state => console.log(state.step)
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.subscribe(spy)

    // When
    viewModel.update()

    // Then
    expect(logSpy.mock.calls[0][0]).toBe(1)
  })

  test('destroy() - ViewModel은 destroy 이후 update를 호출한 경우, 상태를 전달받을 수 없다.', () => {
    // Given
    const spy = state => console.log(state.step)
    const mockModel = new MockModel()
    const viewModel = new ViewModel(mockModel)
    viewModel.subscribe(spy)

    // When
    viewModel.destroy()
    viewModel.update()

    // Then
    expect(logSpy.mock.calls.length).toBe(0)
  })
})
