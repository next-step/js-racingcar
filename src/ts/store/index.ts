import { AnyObj, Status, Actions, StateKeys, State, DispatchEvent, PartialState } from '../types.js'
import ViewStore from './viewStore.js'
import App from '../app.js'
import worker from './worker.js'

export const initialState: State = {
  [StateKeys.cars]: [],
  [StateKeys.totalAttempts]: 0,
  [StateKeys.trial]: 0,
  [StateKeys.scores]: [],
  [StateKeys.processing]: false,
  [StateKeys.winners]: [],
  [StateKeys.status]: Status.idle,
}

export default class Store {
  #subscribers = new Set()
  #state: State

  constructor(app: App, initialState: State) {
    this.#state = initialState
    app.addEventListener('dispatch', ({ detail: { actionType, data } }: DispatchEvent) => {
      this.dispatch(actionType, data)
    })
  }

  dispatch(actionType: keyof typeof Actions, data: AnyObj = {}) {
    window.requestAnimationFrame(() => {
      console.info(`%c[[%c${actionType}%c]]`, 'color: #ee8', 'color: #8ee', 'color: #ee8', data)
      worker(actionType)(this, data)
    })
  }

  register(viewStore: any) {
    this.#subscribers.add(viewStore)
  }

  deregister(viewStore: any) {
    this.#subscribers.delete(viewStore)
  }

  notify() {
    window.requestAnimationFrame(() => {
      this.#subscribers.forEach((subscriber: ViewStore) => {
        subscriber.update(this.#state)
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

export const connectStore = (() => {
  let closureStore: Store
  return (elem?: App, state?: State) => {
    if (elem && state) closureStore = new Store(elem, state)
    return closureStore
  }
})()
