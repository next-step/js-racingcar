import { DOM } from '../constants.js';

class RacingCarGameEndSectionView {
  constructor(target) {
    this.$target = target;
  }

  reset() {
    this.$target.innerHTML = null;
  }

  renderEndSection(winners) {
    this.$target.innerHTML = String.raw`
      <div>
        <h2>🏆 최종 우승자: ${this.gameWinnerTextTemplate(winners)} 🏆</h2>
        ${this.gameRestartButtonTemplate()}
      </div>
    `;
  }

  gameWinnerTextTemplate(winners) {
    return String.raw`<span id="${DOM.GAME_WINNERS_TEXT_ID}">${winners.join(',')}</span>`;
  }

  gameRestartButtonTemplate() {
    return String.raw`
      <div class="d-flex justify-center">
        <button id="${DOM.GAME_RESTART_BUTTON_ID}" type="button" class="btn btn-cyan">다시 시작하기</button>
      </div>
    `;
  }
}

export default RacingCarGameEndSectionView;
