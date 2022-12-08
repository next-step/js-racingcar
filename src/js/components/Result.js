import { DEFAULT_STORE_STATE, EVENT_MAP } from '../constants.js';
import Component from '../core/Component.js';
import store from '../core/Store.js';

class Result extends Component {
  template() {
    return /*html*/ `
      <div>
        <h2 class="winner-name"></h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan restart-button" data-id="restart-button">다시 시작하기</button>
        </div>
      </div>
  `;
  }

  render() {
    const isVisibleResult = store.getState({
      name: 'isVisibleResult',
      that: this,
    });

    const winners = store.getState({
      name: 'winners',
      that: this,
    });

    if (isVisibleResult) {
      this.$target.innerHTML = this.template();
      this.$target.querySelector('.winner-name').innerText = `
      🏆 최종 우승자: ${winners} 🏆
      `;
    } else {
      this.$target.innerHTML = '';
    }
  }

  onRestartButton(event) {
    store.setState({
      ...DEFAULT_STORE_STATE,
    });
  }

  addEventListener() {
    EVENT_MAP.CLICK.set('restart-button', this.onRestartButton.bind(this));
  }
}

export default Result;
