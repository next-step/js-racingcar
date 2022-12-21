import Attempt from './components/Attempt.js';
import Progress from './components/Progress.js';
import Result from './components/Result.js';

export class App {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.render();
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
}
