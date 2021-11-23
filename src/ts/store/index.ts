import Connect from './connect.js'
import App from '../view/app.js'
import Actions from './action.js'
import reducer from './reducer.js'
import { AnyObj } from '../constants.js'

export enum StateKeys {
  cars = 'cars',
  totalAttempts = 'totalAttempts',
  trial = 'trial',
  scores = 'scores',
  processing = 'processing',
  winners = 'winners',
  status = 'status',
}

export type Status = 'idle' | 'playing' | 'finished'

export type State = {
  cars: string[]
  totalAttempts: number
  trial: number
  scores: number[][]
  processing: boolean
  winners: string[]
  status: Status
}

export const initialState: State = {
  [StateKeys.cars]: [],
  [StateKeys.totalAttempts]: 0,
  [StateKeys.trial]: 0,
  [StateKeys.scores]: [],
  [StateKeys.processing]: false,
  [StateKeys.winners]: [],
  [StateKeys.status]: 'idle',
}

export type Dispatch = {
  actionType: typeof Actions
  data: AnyObj
}

export type DispatchEvent = CustomEvent & {
  detail: Dispatch
}

export type StoreMapper = (store: any) => PartialState

export type PartialState = Partial<State>

export default class Store {
  #observers = new Set()
  #state: State

  constructor(app: App, initialState: State) {
    this.#state = initialState
    app.addEventListener('dispatch', ({ detail: { actionType, data } }: DispatchEvent) => {
      this.dispatch(actionType, data)
    })
  }

  dispatch(actionType: keyof typeof Actions, data: AnyObj = {}) {
    window.requestAnimationFrame(() => {
      console.info(
        `%c[ %c${actionType}%c ] %cpayload:`,
        'color: #ff5',
        'color: #f77',
        'color: #ff5',
        'color: #7ff',
        data,
        this.#state,
      )
      reducer(actionType)(this, data)
    })
  }

  observe(viewStore: any) {
    this.#observers.add(viewStore)
  }

  unobserve(viewStore: any) {
    this.#observers.delete(viewStore)
  }

  notify() {
    window.requestAnimationFrame(() => {
      this.#observers.forEach((listener: Connect) => {
        listener.update(this.#state)
      })
    })
  }

  setValue(state: PartialState) {
    window.requestAnimationFrame(() => {
      this.#state = { ...this.#state, ...state }
      this.notify()
    })
  }

  get(prop: StateKeys) {
    return this.#state[prop]
  }
}

export const getStore = (() => {
  let closuredStore: Store
  return (elem?: App, state?: State) => {
    if (elem && state) closuredStore = new Store(elem, state)
    return closuredStore
  }
})()
