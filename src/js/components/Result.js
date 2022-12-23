import { DEFAULT_STORE_STATE } from '../constants/state.js';
import observer from '../core/observer.js';
import { store } from '../store/index.js';

class Result {
  constructor({ $target }) {
    this.$target = $target;
    $target.innerHTML = this.template();
    this.$restartContainer = $target.querySelector('.winner-container');
    this.$restartButton = $target.querySelector('[data-id=restart-button]');
    this.$winnerName = $target.querySelector('.winner-name');

    observer.observe(() => {
      this.render();
      this.addEventListener();
    });
  }

  onRestartButton() {
    store.setState({
      ...DEFAULT_STORE_STATE,
    });
  }

  template() {
    return /*html*/ `
      <div class="winner-container">
        <h2 class="winner-name"></h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan restart-button" data-id="restart-button">다시 시작하기</button>
        </div>
      </div>
  `;
  }

  render() {
    const { isVisibleResult, winners } = store.state;

    if (!isVisibleResult) {
      this.$restartContainer.style.display = 'none';
      return;
    }

    this.$restartContainer.style.display = 'block';
    this.$winnerName.innerText = `
      🏆 최종 우승자: ${winners} 🏆
      `;
  }

  addEventListener() {
    this.$restartButton.addEventListener('click', (event) => {
      this.onRestartButton();
    });
  }
}

export default Result;
