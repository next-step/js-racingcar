import { $ } from '../utils/dom.js';

export default function GameResult() {
  this.$gameResult = $('.game-result-container');

  this.render = () => {
    this.$gameResult.innerHTML = String.raw`
        <div style="display: none;">
          <h2>🏆 최종 우승자: EAST, WEST 🏆</h2>
          <div class="d-flex justify-center">
            <button type="button" class="btn btn-cyan">다시 시작하기</button>
          </div>
        </div>
    `;
  };

  this.render();
}
