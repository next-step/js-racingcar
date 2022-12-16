import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

export const showWinners = (winners = []) => {
  const winnersTemplate = /* html */ `
  <h2 class="game-winners">🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>`;

  $(SELECTOR.FINISH_GAME).insertAdjacentHTML('beforeend', winnersTemplate);
};

export const showRestartBtn = () => {
  const restartBtnTemplate = /* html */ `
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan restart-game-btn">다시 시작하기</button>
    </div>
  `;

  $(SELECTOR.FINISH_GAME).insertAdjacentHTML('beforeend', restartBtnTemplate);
};
