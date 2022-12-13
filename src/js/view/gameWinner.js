import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

// const replayBtnTemplate = /* html */ `
//   <div class="d-flex justify-center">
//     <button type="button" class="btn btn-cyan game-replay-btn">다시 시작하기</button>
//   </div>
// `;

export const showWinners = (winners = []) => {
  const winnersTemplate = /* html */ `
    <h2 class="game-winners">🏆 최종 우승자: ${winners.join(', ')} 🏆</h2>`;

  $(SELECTOR.FINISH_GAME).innerHTML = winnersTemplate;
};
