import Component from '../core/Component';

class GameResult extends Component {
  template = /*html*/ `
    <div>
      <h2>🏆 최종 우승자:  🏆</h2>
      <div class="d-flex justify-center">
        <button type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    </div>
  `;
}

customElements.define('my-game-result', GameResult);
