import { StoreMapper, PartialState, State } from '../types.js'
import View from '../view/constructor.js'

export default class ViewStore {
  #watch: StoreMapper
  #prevState: PartialState = {}
  #view: View

  constructor(view: View, watch: StoreMapper) {
    this.#view = view
    this.#watch = watch
  }

  update(state: State) {
    const newState = this.#watch(state)
    const updatedKeys = new Set()
    const updatedState = Object.keys(newState).reduce<PartialState>((p, k: keyof State) => {
      if (newState[k] !== this.#prevState[k]) {
        updatedKeys.add(k)
        p[k] = newState[k] as any
      }
      return p
    }, {})

    if (updatedKeys.size) {
      this.#prevState = state
      this.#view.onStoreUpdated(updatedState, state)
    }
  }
}
