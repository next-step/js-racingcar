import { Component } from './core/Component.js';
import { store } from './store/index.js';

const InputA = () => `
  <input id="stateA" value="${store.state.a}" size="5" />
`;

const InputB = () => `
  <input id="stateB" value="${store.state.b}" size="5" />
`;

const Calculator = () => `
  <p>a + b = ${store.state.a + store.state.b}</p>
`;

export class App extends Component {
  template() {
    return `
      ${InputA()}
      ${InputB()}
      ${Calculator()}
    `;
  }

  addEventListener() {
    const { $target } = this;

    $target
      .querySelector('#stateA')
      .addEventListener('change', ({ target }) => {
        store.setState({ a: Number(target.value) });
      });

    $target
      .querySelector('#stateB')
      .addEventListener('change', ({ target }) => {
        store.setState({ b: Number(target.value) });
      });
  }
}
