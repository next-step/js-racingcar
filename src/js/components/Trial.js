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
    this.$target
      .querySelector('[data-id=move-input]')
      .setAttribute(
        'value',
        this.state.trialNumber || store.state.trialNumber || ''
      );
    if (!store.state.isVisibleProgress) {
      this.$target.querySelector('[data-id=move-input]').focus();
    }
    if (store.state.isVisibleProgress) {
      this.$target
        .querySelector('[data-id=submit-trial]')
        .setAttribute('disabled', '');
    }
  }

  onTypeMovement(event) {
    this.setState({ trialNumber: Number(event.target.value) });

    // if (event.key === 'Enter' && event.type !== 'submit') {
    //   this.onSubmitTrials(event);
    //   return;
    // }
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
        <button type="button" class="btn btn-cyan" data-id="submit-trial">확인</button>
      </div>
    `;
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('submit-trial', this.onSubmitTrials.bind(this));
    EVENT_MAP.KEY_UP.set('move-input', this.onTypeMovement.bind(this));
  }
}

export default Trial;
