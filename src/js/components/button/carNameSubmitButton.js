import observer from '../../core/observer.js';
import { store } from '../../store/index.js';

export default class CarNameSubmitButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    $target.addEventListener('click', (event) => {
      this.props.onSubmitCarname(event);
    });

    observer.observe(() => {
      this.render();
    });
  }

  render() {
    const { carNames, isVisibleTrial } = store.state;

    const isDisabledButton = isVisibleTrial || !carNames;

    isDisabledButton ? this.$target.setAttribute('disabled', '') : this.$target.removeAttribute('disabled');
  }
}
