import Component from '../core/Component.js';

export default class GameResult extends Component {
  mount() {
    this.$target.innerHTML = `
      <div id="result-section">
        <h2 id="winner">🏆 최종 우승자: ${this.props.winner}🏆</h2>
        <div class="d-flex justify-center">
          <button id="reset-btn" type="button" class="btn btn-cyan">다시 시작하기</button>
        </div>
      </div>
    `;
  }
}
