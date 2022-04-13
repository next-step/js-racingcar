import './components/index.js';
import ComponentHandler from './ComponentHandler.js';
import { $element, $setAttributes } from './helpers/index.js';

const template = /*html*/ `
<fragment>
  <input-section></input-section>
  <game-section car-names="" try-count=""></game-section>
  <result-section winners=""></result-section>
</fragment>`;

export default class App extends ComponentHandler {
  #removeHandler;

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  connectedCallback() {
    this.#removeHandler = this.bindHandler([
      {
        type: 'inputted',
        callback: this.inputtedHandler,
      },
      {
        type: 'reset',
        callback: () => this.firstElementChild.replaceWith($element(template)),
      },
    ]);
  }

  disconnectedCallback() {
    this.#removeHandler();
  }

  inputtedHandler = ({ detail }) => {
    const attributes = [
      ['car-names', detail.carNames],
      ['try-count', detail.tryCount],
    ];

    $setAttributes('game-section', attributes);
  };
}

customElements.define('racing-app', App);
