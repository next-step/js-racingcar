import Component from '../core/Component.js';
import store from '../core/Store.js';

class Result extends Component {
  render() {
    const isVisibleResult = store.getState({
      name: 'isVisibleResult',
      that: this,
    });

    if (isVisibleResult) {
      this.$target.innerHTML = this.template();
    }

    if (!isVisibleResult && this.$target.innerHTML.length) {
      this.$target.innerHTML = '';
    }
  }

  template() {
    return /*html*/ `
      <div>
        <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
        <div class="d-flex justify-center">
          <button type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
  `;
  }
}

export default Result;
