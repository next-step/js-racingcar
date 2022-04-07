import './index.js';

export default class App extends HTMLElement {
  #template = /*html*/ `
    <fragment>
      <input-section></input-section>
      <game-section></game-section>
      <result-section></result-section>
    </fragment>`;

  constructor() {
    super();
    this.insertAdjacentHTML('afterbegin', this.#template);
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  adoptedCallback() {}
}

customElements.define('racing-app', App);
