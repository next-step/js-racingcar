import { EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import { store } from '../store/index.js';
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
    const { trialNumber, isVisibleProgress, racingMap } = store.state;

    $moveInput.setAttribute('value', trialNumber || '');

    if (!Number.isInteger(trialNumber)) {
      $moveButton.setAttribute('disabled', '');
    } else {
      $moveButton.removeAttribute('disabled');
    }

    if (!isVisibleProgress) {
      $moveInput.focus();
    } else {
      $moveButton.setAttribute('disabled', '');
    }
    this.componentUpdated();
  }

  onTypeMovement(event) {
    store.setState({ trialNumber: Number(event.target.value) });
  }

  async componentUpdated() {
    const { racingMap, trialNumber, isVisibleProgress, isRacingEnd } =
      store.state;
    if (isRacingEnd) {
      return;
    }
    if (!isVisibleProgress) return;
    const winner = getRacingWinner({ racingMap, trialNumber });
    if (winner.length) {
      alert('레이싱이 끝났습니다');

      console.log('@@@@@@@@', winner);
      !isRacingEnd && store.setState({ isRacingEnd: true });
      return;
    }

    await waitUntil(700);

    store.setState({
      racingMap: makeNewRacingMap(racingMap),
    });
  }

  onSubmitTrials(event) {
    const { racingMap, trialNumber } = store.state;
    if (!Number.isInteger(trialNumber)) {
      alert('');
      return;
    }
    event.preventDefault();

    store.setState({
      isVisibleProgress: true,
      racingMap: makeNewRacingMap(racingMap),
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
