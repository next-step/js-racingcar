import { MAX_TRIAL_NUMBER } from '../constants.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';
import {
  getRacingWinner,
  makeNewRacingMap,
  waitUntil,
} from '../utils/index.js';

class Trial {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();
    this.$moveInput = $target.querySelector('[data-id=move-input]');
    this.$moveButton = $target.querySelector('[data-id=move-submit]');

    observer.observe(() => {
      this.render();
      this.addEventListener();
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

  render() {
    const { $moveInput, $moveButton } = this;
    const { trialNumber, isVisibleProgress } = store.state;

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
    const { racingMap, trialNumber, isVisibleProgress, isRacingEnd } =
      store.state;

    const winner = getRacingWinner({ racingMap, trialNumber });

    if (isRacingEnd || !isVisibleProgress) return;

    if (winner.length) {
      return store.setState({
        isRacingEnd: true,
        winners: winner.join(','),
        isVisibleResult: true,
      });
    }

    await waitUntil(700);

    store.setState({
      racingMap: makeNewRacingMap(racingMap),
    });
  }

  onSubmitTrials() {
    const { racingMap, trialNumber } = store.state;
    const newRacingMap = makeNewRacingMap(racingMap);

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

  addEventListener() {
    this.$moveButton.addEventListener('click', (event) => {
      if (event.target.dataset.id === 'move-submit') this.onSubmitTrials(event);
    });

    this.$moveInput.addEventListener('keyup', (event) => {
      this.onTypeMovement(event);
    });
  }
}

export default Trial;
