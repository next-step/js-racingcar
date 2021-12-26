import RacingCarInputName from './components/RacingCarInputName.js'
import RacingCarInputTryCount from './components/RacingCarInputTryCount.js'
import RacingCarCompetition from './components/RacingCarCompetition.js'
import RacingCarResult from './components/RacingCarResult.js'
import { VIEW, ALL_VIEW } from './components/constants.js'
import { ACTION, initStateValue } from './constants.js'
import { cloneDeep, createRandomNumber, delay } from './utils/index.js'

export default class App {
  #store
  #state
  constructor(store, state) {
    this.#store = store
    this.#state = state
    this.init()
  }
  init = () => {
    const getState = this.getState
    const setState = this.setState
    this.#store.registerObserver(
      {
        key: VIEW.RacingCarInputName,
        component: new RacingCarInputName('#car-name-fieldset', { getState, setState }),
      },
      {
        key: VIEW.RacingCarInputTryCount,
        component: new RacingCarInputTryCount('#car-try-count-fieldset', { getState, setState }),
      },
      {
        key: VIEW.RacingCarCompetition,
        component: new RacingCarCompetition('#car-competition', { getState, setState }),
      },
      {
        key: VIEW.RacingCarResult,
        component: new RacingCarResult('#car-winner', { getState, setState }),
      }
    )
  }
  getState = () => this.#state

  setState = (action) => {
    const [newState, keys] = this.reducer(this.#state, action)
    this.#state = newState
    this.#store.notifyObservers(keys)
  }

  reducer = (prevState, { type, payload }) => {
    switch (type) {
      case ACTION.UPDATE_CAR_NAME:
        return this.updateCarNames(prevState, payload)
      case ACTION.UPDATE_TRY_COUNT:
        return this.updateTryCount(prevState, payload)
      case ACTION.RACING:
        return this.updateRacing(prevState)
      case ACTION.SHOW_WINNER:
        return this.updateWinner(prevState, payload)
      case ACTION.RESET_RACING:
        return this.reset(prevState)
      default:
        prevState
    }
  }

  updateCarNames = (prevState, carNames) => {
    return [{ ...prevState, carNames }, [VIEW.RacingCarInputName, VIEW.RacingCarInputTryCount]]
  }

  updateTryCount = (prevState, carTryCount) => {
    return [{ ...prevState, carTryCount }, [VIEW.RacingCarInputTryCount]]
  }

  updateRacing = (prevState) => {
    const { carRacing: prevCarRacing, carTryCount: prevCarTryCount } = prevState

    if (Object.keys(prevCarRacing).length === 0 && prevCarTryCount !== 0) {
      const carTryCount = prevCarTryCount - 1
      let carRacing = this.#state.carNames.reduce((p, name) => {
        p[name] = [createRandomNumber()]
        return p
      }, {})

      if (carTryCount === 0) carRacing = this.filterPendingCar(carRacing)

      return [{ ...prevState, carTryCount, carRacing }, [VIEW.RacingCarCompetition]]
    }

    const carTryCount = prevCarTryCount - 1
    const readyRacingCar = this.filterPendingCar(prevCarRacing)
    let carRacing = Object.keys(readyRacingCar).reduce((p, name) => {
      p[name] = [...readyRacingCar[name], createRandomNumber()]
      return p
    }, {})

    if (carTryCount === 0) carRacing = this.filterPendingCar(carRacing)

    return [{ ...prevState, carTryCount, carRacing }, [VIEW.RacingCarCompetition]]
  }

  updateWinner = (prevState) => {
    const { carRacing } = prevState
    const maxDistance = Object.keys(carRacing).reduce((p, name) => {
      const len = carRacing[name].length
      return p > len ? p : len
    }, 0)
    const winners = Object.keys(carRacing).reduce((p, name) => {
      if (maxDistance === carRacing[name].length) {
        p.push(name)
      }
      return p
    }, [])
    return [{ ...prevState, winners }, [VIEW.RacingCarResult]]
  }

  reset = () => {
    return [cloneDeep(initStateValue), ALL_VIEW]
  }

  filterPendingCar = (carRacing) => {
    return Object.keys(carRacing).reduce((p, name) => {
      p[name] = carRacing[name].filter((car) => car >= 4)
      return p
    }, {})
  }
}
