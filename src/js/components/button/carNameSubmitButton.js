import observer from '../../core/observer.js';
import { store } from '../../store/index.js';

export default class CarNameSubmitButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    $target.addEventListener('click', (event) => {
      this.onSubmitCarname(event);
    });

    observer.observe(() => {
      this.render();
    });
  }

  render() {
    const { carNames, isVisibleTrial } = store.state;

    const isDisabledButton = isVisibleTrial || !carNames;

    if (isDisabledButton) this.$target.setAttribute('disabled', '');
    if (!isDisabledButton) this.$target.removeAttribute('disabled');
  }
}
