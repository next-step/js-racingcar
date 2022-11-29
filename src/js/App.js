import Attempt from './components/Attempt.js';
import Progress from './components/Progress.js';
import Result from './components/Result.js';
import { CLICK_EVENT_MAP } from './constants.js';
import Component from './core/Component.js';
import { store } from './store/index.js';

export class App extends Component {
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

  // mounted() {
  //   this.$target.innerHTML = this.template();
  // }

  render() {
    const { $target } = this;
    const { isVisibleProgress, isVisibleResult } = store.state;
    new Attempt({
      $target: $target.querySelector('.attempt-container'),
    });

    if (isVisibleProgress) {
      new Progress({
        $target: $target.querySelector('.progress-container'),
      });
    }

    if (isVisibleResult) {
      new Result({
        $target: $target.querySelector('.result-container'),
      });
    }
  }

  addEventListener() {
    const { $target } = this;
    $target.addEventListener('click', (event) => {
      if (CLICK_EVENT_MAP.has(event.target.dataset.id)) {
        CLICK_EVENT_MAP.get(event.target.dataset.id)(event);
      }
    });

    $target.addEventListener('keyup', (event) => {
      if (event.target.classList.contains('car-name-input')) {
        store.setState({ carNames: event.target.value });
      }
    });

    // $target
    //   .querySelector('#stateB')
    //   .addEventListener('change', ({ target }) => {
    //     store.setState({ b: Number(target.value) });
    //   });
  }
}
