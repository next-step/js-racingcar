import { connectStore, initialState } from './store/index.js';
import el from './util/dom.js';
import FormCarNames from './view/formCarNames.js';
import FormAttempts from './view/formAttempts.js';
import Playboard from './view/playboard.js';
import Winner from './view/winner.js';
import Player from './view/player/index.js';
import PlayerWaiting from './view/player/playerWaiting.js';
import PlayerForward from './view/player/playerForward.js';
export default class App extends HTMLElement {
    static #template = `
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
        store.notify();
    }
}
/* 상위->하위 순서로 정의해줘야 제대로 동작함. */
// depth 0
customElements.define('racingcar-app', App);
// depth 1
customElements.define('racingcar-form-names', FormCarNames);
customElements.define('racingcar-form-attempts', FormAttempts);
customElements.define('racingcar-playboard', Playboard);
customElements.define('racingcar-winner', Winner);
// depth 2
customElements.define('racingcar-player', Player);
// depth 3
customElements.define('racingcar-player-waiting', PlayerWaiting);
customElements.define('racingcar-player-forward', PlayerForward);
//# sourceMappingURL=index.js.map