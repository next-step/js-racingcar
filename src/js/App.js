import './components/index.js';
import Template from './Template.js';
import { $element, $setAttributes } from './helpers/index.js';

const template = /*html*/ `
<fragment>
  <input-section></input-section>
  <game-section car-names="" try-count=""></game-section>
  <result-section winners=""></result-section>
</fragment>`;

export default class App extends Template {
  #handler = [];

  constructor() {
    super();
    this.insertAdjacentElement('afterbegin', $element(template));
  }

  connectedCallback() {
    this.#handler = this.bindHandler([
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
    this.#handler();
  }

  inputtedHandler = ({ detail }) => {
    const attrs = [
      { attr: 'car-names', value: detail.carNames },
      { attr: 'try-count', value: detail.tryCount },
    ];
    $setAttributes({ target: 'game-section', attrs });
  };
}

customElements.define('racing-app', App);
