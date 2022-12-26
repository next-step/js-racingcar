import CarNameRegister from './components/CarNameRegister.js';
import RaceProgress from './components/RaceProgress.js';
import Result from './components/Result.js';
import { ELEMENT } from './constants/elements.js';

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

    new CarNameRegister({
      $target: $target.querySelector(ELEMENT.ATTEMPT_CONTAINER),
    });

    new RaceProgress({
      $target: $target.querySelector(ELEMENT.PROGRESS_CONTAINER),
    });

    new Result({
      $target: $target.querySelector(ELEMENT.RESULT_CONTAINER),
    });
  }
}
