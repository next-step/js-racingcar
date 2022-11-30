import Attempt from './components/Attempt.js';
import Progress from './components/Progress.js';
import Result from './components/Result.js';
import { EVENT_MAP } from './constants.js';
import Component from './core/Component.js';

export class App extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  template() {
    return /*html*/ `
    <section class="d-flex justify-center mt-5 attempt-container">
    </section>
    <section class="d-flex justify-center mt-5 progress-container">
    </section>
    <section class="d-flex justify-center mt-5 result-container">
    </section>
    `;
  }

  render() {
    const { $target } = this;

    new Attempt({
      $target: $target.querySelector('.attempt-container'),
    });

    new Progress({
      $target: $target.querySelector('.progress-container'),
    });

    new Result({
      $target: $target.querySelector('.result-container'),
    });
  }

  addEventListener() {
    const { $target } = this;

    $target.addEventListener('click', (event) => {
      if (EVENT_MAP.CLICK.has(event.target.dataset.id)) {
        EVENT_MAP.CLICK.get(event.target.dataset.id)(event);
      }
    });

    $target.addEventListener('keyup', (event) => {
      if (EVENT_MAP.KEY_UP.has(event.target.dataset.id)) {
        EVENT_MAP.KEY_UP.get(event.target.dataset.id)(event);
      }
    });

    document.addEventListener('submit', (event) => {
      Array.from(EVENT_MAP.SUBMIT.values()).forEach((el) => {
        el(event);
      });
    });
  }
}
