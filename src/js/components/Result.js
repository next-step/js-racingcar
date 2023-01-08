import { ELEMENT } from '../constants/elements.js';
import { DEFAULT_STORE_STATE } from '../constants/state.js';
import { ALERT_WAITING_TIME } from '../constants/validation.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';
import { waitUntil } from '../utils/asyncHandle.js';

class Result {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();

    this.$restartContainer = $target.querySelector(ELEMENT.WINNER_CONTAINER);
    this.$winnerName = $target.querySelector(ELEMENT.WINNER_NAME);
    this.$restartButton = $target.querySelector(ELEMENT.RESART_BUTTON);

    this.$restartButton.addEventListener('click', () => {
      this.onRestartButton();
    });

    observer.observe(() => {
      this.render();
    });
  }

  template() {
    return /*html*/ `
      <div class="winner-container">
        <h2 class="winner-name"></h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan restart-button">다시 시작하기</button>
        </div>
      </div>
  `;
  }

  alertWinner = async (winners) => {
    await waitUntil(ALERT_WAITING_TIME);
    window.alert(`우승자는 ${winners} 입니다. 축하합니다!`);
  };

  render() {
    const { winners } = store.state;

    if (!winners.length) {
      this.$restartContainer.style.display = 'none';
      return;
    }

    this.$restartContainer.style.display = 'block';
    this.$winnerName.innerText = `
      🏆 최종 우승자: ${winners} 🏆
      `;

    this.alertWinner(winners);
  }

  onRestartButton() {
    store.setState({
      ...DEFAULT_STORE_STATE,
    });
  }
}

export default Result;
