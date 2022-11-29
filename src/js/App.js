import Attempt from './components/Attempt.js';
import Progress from './components/Progress.js';
import Result from './components/Result.js';
import Component from './core/Component.js';

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
    new Attempt({
      $target: this.$target.querySelector('.attempt-container'),
    });
    new Progress({
      $target: this.$target.querySelector('.progress-container'),
    });
    new Result({
      $target: this.$target.querySelector('.result-container'),
    });
  }

  addEventListener() {
    const { $target } = this;

    // $target
    //   .querySelector('#stateA')
    //   .addEventListener('change', ({ target }) => {
    //     store.setState({ a: Number(target.value) });
    //   });

    // $target
    //   .querySelector('#stateB')
    //   .addEventListener('change', ({ target }) => {
    //     store.setState({ b: Number(target.value) });
    //   });
  }
}
