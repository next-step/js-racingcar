import { $ } from '../utils/dom'
import { Action, makeState, State } from '../view/Racing.state'
import { setStyle } from '../view/Racing.view'

export const ViewComponents = {
  GameCountFieldset: $({ selector: 'game-count-fieldset', type: 'CLASSNAME' }),
  CarNameFieldset: $({ selector: 'car-name-fieldset', type: 'CLASSNAME' }),
  RacingRoadSection: $({ selector: 'racing-road-section', type: 'CLASSNAME' }),
  WinnerSection: $({ selector: 'winner-section', type: 'CLASSNAME' }),
  CarNameInput: $({ selector: 'car_name_input' }) as HTMLInputElement,
  CarNameButton: $({ selector: 'car_name_button' }) as HTMLButtonElement,
  GameCountInput: $({ selector: 'game_count_input' }) as HTMLInputElement,
  GameCountButton: $({ selector: 'game_count_button' }) as HTMLButtonElement,
  ResetButton: $({ selector: 'reset_button' }),
  RacingContainer: $({ selector: 'racing-road-container' }),
  WinnerLabel: $({ selector: 'winner_label' }),
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
      RacingContainer,
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
          CarNameInput.value = ''
          GameCountInput.value = ''
          RacingContainer.innerHTML = ''

          CarNameInput.focus()
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

        return
      }

      let maxMovementDistance = -1
      const winners = this.state.cars
        .map((car) => {
          if (maxMovementDistance < car.moveDistance) {
            maxMovementDistance = car.moveDistance
          }
          return { name: car.name, move: car.moveDistance }
        })
        .filter((car) => car.move === maxMovementDistance)
        .map((car) => car.name)

      this.dispatchEvent({
        makeAction: () => ({ _t: 'SET_WINNER', winners }),
        onEventEnd: () => {
          ViewComponents.WinnerLabel.textContent = `🏆 최종 우승자: ${winners.join(
            ', '
          )} 🏆`
        },
      })
    }

    animate()
  }
}

export default RacingController
