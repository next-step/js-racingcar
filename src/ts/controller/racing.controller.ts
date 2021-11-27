import { $ } from '../utils/dom'
import { Action, makeState, State } from '../view/Racing.state'
import { setStyle } from '../view/Racing.view'

export const ViewComponents = {
  GameCountFieldset: $('game-count-fieldset', 'CLASSNAME'),
  CarNameFieldset: $('car-name-fieldset', 'CLASSNAME'),
  RacingRoadSection: $('racing-road-section', 'CLASSNAME'),
  WinnerSection: $('winner-section', 'CLASSNAME'),
  CarNameInput: $('car_name_input') as HTMLInputElement,
  CarNameButton: $('car_name_button') as HTMLButtonElement,
  GameCountInput: $('game_count_input') as HTMLInputElement,
  GameCountButton: $('game_count_button') as HTMLButtonElement,
  ResetButton: $('reset_button'),
  RacingContainer: $('racing-road-container'),
}

class RacingController {
  currentProgressCount: number
  state: State
  dispatch: (action: Action) => void

  constructor() {
    const { state, dispatch } = makeState({
      _t: 'idle',
      cars: [],
      gameCount: null,
    })

    this.currentProgressCount = 0
    this.state = state
    this.dispatch = dispatch

    setStyle(state)
    this.setEvent()
  }

  setEvent() {
    const {
      CarNameInput,
      CarNameButton,
      GameCountInput,
      GameCountButton,
      WinnerSection,
    } = ViewComponents

    const dispatchInsertCars = () =>
      this.dispatchEvent({
        makeAction: () => {
          return {
            _t: 'INSERT_CARS',
            carNames: CarNameInput.value,
          }
        },
        onError: () => {
          CarNameInput.value = ''
          CarNameInput.focus()
        },
        onEventEnd: () => {
          GameCountInput.focus()
        },
      })

    const dispatchInsertGameCount = () =>
      this.dispatchEvent({
        makeAction: () => {
          return {
            _t: 'INSERT_GAME_COUNT',
            gameCount: Number(GameCountInput.value),
          }
        },
        onEventEnd: () => this.startGame(),
        onError: () => {
          GameCountInput.value = ''
          GameCountInput.focus()
        },
      })

    const dispatchResetGame = () =>
      this.dispatchEvent({
        makeAction: () => {
          return {
            _t: 'SET_IDLE',
          }
        },
        onEventEnd: () => {
          this.currentProgressCount = 0
        },
      })

    const isPressEnter = (event: KeyboardEvent) => event.key === 'Enter'

    CarNameButton.addEventListener('click', () => dispatchInsertCars())
    GameCountButton.addEventListener('click', () => dispatchInsertGameCount())
    WinnerSection.addEventListener('click', () => dispatchResetGame())

    CarNameInput.addEventListener('keypress', (event) => {
      if (isPressEnter(event)) {
        dispatchInsertCars()
      }
    })
    GameCountInput.addEventListener('keypress', (event) => {
      if (isPressEnter(event)) {
        dispatchInsertGameCount()
      }
    })
  }

  dispatchEvent({
    makeAction,
    onEventEnd = () => {},
    onError = () => {},
  }: {
    makeAction: () => Action
    onEventEnd?: () => void
    onError?: () => void
  }) {
    try {
      this.dispatch(makeAction())
      setStyle(this.state)
      onEventEnd()
    } catch (error) {
      onError()
      alert(error.message)
    }
  }

  resetGame() {
    this.dispatch({ _t: 'SET_IDLE' })
  }

  startGame() {
    this.state.cars.forEach((car) => {
      car.targetCount = this.state.gameCount || 0
      car.renderRoad()
    })

    const animate = () => {
      this.currentProgressCount += 1

      this.state.cars.forEach((car) => car.move(this.currentProgressCount))

      if (this.currentProgressCount < (this.state.gameCount || 0)) {
        requestAnimationFrame(() => {
          setTimeout(() => animate(), 1000)
        })
      }
    }
    animate()
  }
}

export default RacingController
