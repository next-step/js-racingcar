import observer from '../../core/observer.js';
import { store } from '../../store/index.js';

export default class MoveInput {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.props = props;

    $target.addEventListener('keyup', (event) => {
      this.onTypeMovement(event);
    });

    observer.observe(() => {
      this.render();
    });
  }

  onTypeMovement(event) {
    const { value } = event.target;
    store.setState({ trialNumber: Number(value) });
  }

  render() {
    const { $target } = this;
    const { trialNumber, isVisibleProgress, isVisibleTrial } = store.state;

    $target.value = trialNumber;

    if (isVisibleProgress) {
      $target.setAttribute('disabled', '');
      return;
    }

    $target.focus();
    $target.removeAttribute('disabled');
  }
}
