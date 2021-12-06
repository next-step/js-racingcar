import { connectStore, initialState } from './store/index.js';
import el from './util/dom.js';
export default class App extends HTMLElement {
    static #template = /* html */ `
    <fragment>
      <h1 class="text-center">🏎️ 자동차 경주 게임</h1>
      <section class="mt-5">
        <racingcar-form-names></racingcar-form-names>
        <racingcar-form-attempts></racingcar-form-attempts>
      </section>
      <section class="d-flex justify-center mt-5">
        <racingcar-playboard></racingcar-playboard>
      </section>
      <racingcar-winner></racingcar-winner>
    </fragment>
  `;
    constructor() {
        super();
        const store = connectStore(this, initialState);
        el(this, [el(App.#template)]);
        store.dispatch('init');
    }
}
customElements.define('racingcar-app', App);
//# sourceMappingURL=app.js.map