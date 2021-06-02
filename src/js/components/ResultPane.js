import { $ } from '../utils/helpers.js';

export default function ResultPane(pane) {
  // this.$pane = pane;
  this.showWinner = (winners) => {
    pane.classList.remove('hidden');
    let s = '🏆 최종 우승자: ';
    winners.map((winner, index) => {
      if (index > 0) s += `, ${winner}`;
      else s += winner;
    });
    s += '🏆';
    $('h2', pane).innerText = s;
  };

  this.reset = () => {
    pane.classList.add('hidden');
    $('h2', pane).innerText = '';
  };
}
