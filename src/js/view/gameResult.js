import { SELECTOR } from '../constants/selector.js';

import { $ } from '../utils/dom.js';

export const showWinners = (winners = []) => {
  $(SELECTOR.WINNERS).innerText = `🏆 최종 우승자: ${winners.join(', ')} 🏆`;
};

export const showGameResult = () => {
  $(SELECTOR.GAME_RESULT).parentElement.classList.remove('display-none');
};
