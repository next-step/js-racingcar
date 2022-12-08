import { EVENT_MAP, MAX_TRIAL_NUMBER } from '../constants.js';
import Component from '../core/Component.js';
import store from '../core/Store.js';
import {
  getRacingWinner,
  makeNewRacingMap,
  waitUntil,
} from '../utils/index.js';
class Trial extends Component {
  constructor({ $target, props = {} }) {
    super({ $target, props });
  }

  render() {
    const $moveInput = this.$target.querySelector('[data-id=move-input]');
    const $moveButton = this.$target.querySelector('[data-id=move-submit]');
    const trialNumber = store.getState({ name: 'trialNumber', that: this });
    const isVisibleProgress = store.getState({
      name: 'isVisibleProgress',
      that: this,
    });
    const isVisibleResult = store.getState({
      name: 'isVisibleResult',
      that: this,
    });
    if (!$moveButton || !$moveButton) return;

    const isDisbledButton = isVisibleProgress || !trialNumber;
    const isDisabledInput = isVisibleProgress;

    if (isDisbledButton) $moveButton.setAttribute('disabled', '');
    if (!isDisbledButton) $moveButton.removeAttribute('disabled');
    if (isDisabledInput) $moveInput.setAttribute('disabled', '');
    if (!isDisabledInput) $moveInput.focus();

    $moveInput.setAttribute('value', trialNumber || '');

    this.componentUpdated();
  }

  onTypeMovement(event) {
    const { value } = event.target;

    const isSubmit = event.key === 'Enter' && value.length;

    if (isSubmit) {
      this.onSubmitTrials(event);
      return;
    }
    store.setState({ trialNumber: Number(value) });
  }

  async componentUpdated() {
    const racingMap = store.getState({ name: 'racingMap', that: this });
    const trialNumber = store.getState({
      name: 'trialNumber',
      that: this,
    });
    const isVisibleProgress = store.getState({
      name: 'isVisibleProgress',
      that: this,
    });
    const isRacingEnd = store.getState({
      name: 'isRacingEnd',
      that: this,
    });

    const winner = getRacingWinner({ racingMap, trialNumber });

    if (isRacingEnd) {
      return;
    }
    if (!isVisibleProgress) return;

    if (winner.length) {
      // alert(`레이싱이 끝났습니다 : ${winner.join(',')}`);

      !isRacingEnd &&
        store.setState({
          isRacingEnd: true,
          winners: winner.join(','),
          isVisibleResult: true,
        });
      return;
    }

    await waitUntil(700);

    store.setState({
      racingMap: makeNewRacingMap(racingMap),
    });
  }

  onSubmitTrials(event) {
    const racingMap = store.getState({ name: 'racingMap', that: this });
    const newRacingMap = makeNewRacingMap(racingMap);
    const trialNumber = store.getState({
      name: 'trialNumber',
      that: this,
    });

    if (trialNumber > MAX_TRIAL_NUMBER) {
      alert('30회 이하의 시도를 입력해주세요');
      return;
    }

    if (!trialNumber) return;

    store.setState({
      isVisibleProgress: true,
      racingMap: newRacingMap,
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
