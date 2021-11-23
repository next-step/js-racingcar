import { View } from '../viewConstructor.js'
import { getStore, initialState } from '../store/index.js'
import el from '../util/dom.js'

export default class App extends View {
  static #template = `
  <div id="app">
    <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
    <section class="mt-5">
      <form-car-names></form-car-names>
      <form-attempts></form-attempts>
    </section>
    <section class="d-flex justify-center mt-5">
      <play-board></play-board>
    </section>
    <play-winner></play-winner>
  </div>
  `
  #store

  constructor() {
    super()
    const $app = el(App.#template)
    el(this, [$app])
    this.#store = getStore(this, initialState)
  }

  connectedCallback() {
    this.observe()
    this.#store.notify()
  }
}
