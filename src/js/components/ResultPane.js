import { $ } from '../utils/helpers.js';

export default function ResultPane(pane) {
  this.$pane = pane;

  this.setPane = (pane) => {
    this.$pane = pane;
  }

  this.showWinner = (winners) => {
    this.$pane.classList.remove('hidden');
    let s = '🏆 최종 우승자: ';
    winners.map((winner, index) => {
      if (index > 0) s += `, ${winner}`;
      else s += winner;
    });
    s += '🏆';
    $('h2', this.$pane).innerText = s;
  };

  this.reset = () => {
    this.$pane.classList.add('hidden');
    $('h2', this.$pane).innerText = '';
  };
}
