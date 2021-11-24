import Actions from './action.js'
import { AnyObj, Boundaries, CongratulationMsg, ErrorMsgs, Status } from '../constants.js'
import Store, { StateKeys } from './index.js'
import { promiseDelay, abortableDelay } from '../util/delay.js'
import errorHandler from '../util/errorHandler.js'

let abortAlert = () => {}

const worker: { [key: string]: (store: Store, data: AnyObj) => void } = {
  [Actions.setCarNames]: (store, { cars }) => {
    abortAlert()
    const carNames = cars.map((c: string) => c.trim()) as string[]
    if (carNames.some(n => n.length > Boundaries.MaximumNameLength)) throw Error(ErrorMsgs.NAME_LENGTH_LIMIT)
    store.setValue({ cars: carNames, totalAttempts: 0, trial: 0, scores: [], winners: [] })
  },

  [Actions.setTotalAttempts]: async (store, { totalAttempts }) => {
    abortAlert()
    store.setValue({ status: Status.idle, totalAttempts, trial: 0, scores: [], winners: [] })
    store.dispatch(Actions.race, { trial: 1 })
  },

  [Actions.race]: async (store, { trial }) => {
    const cars = store.get(StateKeys.cars) as string[]
    const scores = store.get(StateKeys.scores) as number[][]
    const totalAttempts = store.get(StateKeys.totalAttempts) as number
    store.setValue({ status: Status.playing, trial, processing: true })

    await promiseDelay(1000)
    const result = cars.map(() => Math.floor(Math.random() * 10))

    const newStatus = cars.map((_, i) => {
      const s = scores[i]
      return trial === 1 || !s?.length ? [result[i]] : [...s, result[i]]
    })
    store.setValue({ status: Status.playing, scores: newStatus, processing: false })

    if (trial < totalAttempts) store.dispatch(Actions.race, { trial: trial + 1 })
    else if (totalAttempts > 0 && trial === totalAttempts) store.dispatch(Actions.raceFinished)
  },

  [Actions.raceFinished]: store => {
    const cars = store.get(StateKeys.cars) as string[]
    const scores = store.get(StateKeys.scores) as number[][]
    const result = scores.map(stat => stat.filter(s => s >= Boundaries.ForwardCutOff).length)
    const max = Math.max(...result)
    const winners = result.reduce<string[]>((p, r, i) => {
      if (r === max) p.push(cars[i])
      return p
    }, [])
    store.setValue({ status: Status.finished, winners })

    const { setDelay, abortDelay } = abortableDelay()
    setDelay(() => store.dispatch(Actions.notifyWinner), 2000)
    abortAlert = abortDelay
  },

  [Actions.notifyWinner]: store => {
    window.alert(`${(store.get(StateKeys.winners) as string[]).join(', ')}${CongratulationMsg}`)
  },

  [Actions.reset]: store => {
    abortAlert()
    store.setValue({ status: Status.idle, cars: [], totalAttempts: 0, trial: 0, scores: [], winners: [] })
  },
}

const workerWithErrorCatcher = (dispatcher: (store: Store, data: AnyObj) => void) => (store: Store, data: AnyObj) => {
  try {
    dispatcher(store, data)
  } catch (err) {
    errorHandler('worker', err)
  }
}

export default (actionType: keyof typeof Actions) => workerWithErrorCatcher(worker[actionType])
