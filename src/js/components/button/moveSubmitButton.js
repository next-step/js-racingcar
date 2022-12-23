import observer from '../../core/observer.js';
import { store } from '../../store/index.js';

export default class MoveSubmitButton {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    observer.observe(() => {
      this.render();
    });

    this.$target.addEventListener('click', (event) => {
      props.onSubmitTrials(event);
    });
  }

  render() {
    const { $target } = this;
    const { trialNumber, isVisibleProgress } = store.state;
    const isDisbledButton = isVisibleProgress || !trialNumber;

    isDisbledButton
      ? $target.setAttribute('disabled', '')
      : $target.removeAttribute('disabled');
  }
}
