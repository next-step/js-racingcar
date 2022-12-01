import { EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import { store } from '../store/index.js';
class Trial extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
    this.state = {
      trialNumber: null,
    };
  }

  render() {
    const $moveInput = this.$target.querySelector('[data-id=move-input]');
    const $moveButton = this.$target.querySelector('[data-id=move-submit]');

    $moveInput.setAttribute(
      'value',
      this.state.trialNumber || store.state.trialNumber || ''
    );

    if (!Number.isInteger(this.state.trialNumber)) {
      $moveButton.setAttribute('disabled', '');
    } else {
      $moveButton.removeAttribute('disabled');
    }

    if (!store.state.isVisibleProgress) {
      $moveInput.focus();
    } else {
      $moveButton.setAttribute('disabled', '');
    }
  }

  onTypeMovement(event) {
    this.setState({ trialNumber: Number(event.target.value) });
  }

  onSubmitTrials(event) {
    //*TODO: split car names and make progress

    if (!Number.isInteger(this.state.trialNumber)) {
      alert('');
      return;
    }
    event.preventDefault();

    store.setState({
      trialNumber: this.state.trialNumber,
      isVisibleProgress: true,
    });
  }

  template() {
    return /*html*/ `
      <p class="move-explanation">시도할 횟수를 입력해주세요.</p>
      <div class="d-flex">
        <input type="number" class="w-100 mr-2 move-input" placeholder="시도 횟수" data-id="move-input"/>
        <button type="button" class="btn btn-cyan move-submit-button" data-id="move-submit">확인</button>
      </div>
    `;
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('move-submit', this.onSubmitTrials.bind(this));
    EVENT_MAP.KEY_UP.set('move-input', this.onTypeMovement.bind(this));
  }
}

export default Trial;
