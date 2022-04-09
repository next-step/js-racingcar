import './components/index.js';
import { CONTROLL_KEY } from './constants.js';
import { $template } from './helpers/index.js';

const AppTemplate = $template(/*html*/ `
<fragment>
  <input-section></input-section>
  <game-section></game-section>
  <result-section></result-section>
</fragment>`);

export default class App extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.insertAdjacentElement('afterbegin', AppTemplate);
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    this.replaceChildren(AppTemplate);
  }

  static get observedAttributes() {
    return [CONTROLL_KEY.CAR_NAMES, 'try-count', 'winners'];
  }
}

customElements.define('racing-app', App);
