import observer from '../../core/observer.js';
import { store } from '../../store/index.js';

export default class CarNameInput {
  constructor({ $target }) {
    this.$target = $target;

    $target.addEventListener('keyup', (event) => {
      this.onInputCarNames(event);
    });

    observer.observe(() => {
      this.render();
    });
  }

  onInputCarNames(event) {
    store.setState({ carNames: event.target.value });
  }

  render() {
    const { isVisibleTrial, carNames } = store.state;

    this.$target.value = carNames;

    if (!isVisibleTrial) {
      this.$target.removeAttribute('disabled');
      this.$target.focus();
      return;
    }

    if (isVisibleTrial) this.$target.setAttribute('disabled', '');
  }
}
