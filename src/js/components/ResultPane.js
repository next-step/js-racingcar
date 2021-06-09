import { $ } from '../utils/helpers.js';

export default function ResultPane(pane) {
  this.$pane = pane;

  this.setPane = (pane) => {
    this.$pane = pane;
  }

  this.showWinner = (winners) => {
    this.$pane.classList.remove('hidden');
    $('h2', this.$pane).innerText = `🏆 최종 우승자: ${winners.join(',  ')}🏆`;
  };

  this.reset = () => {
    this.$pane.classList.add('hidden');
    $('h2', this.$pane).innerText = '';
  };
}
