import BaseController from './BaseController.js';

export default class Winner extends BaseController {
  constructor(state) {
    super(state);

    this.$raceWinner = document.querySelector('#race-winner');
  }

  #getHasRaceWinner() {
    return !!this.state.winners.length;
  }

  render() {
    if (this.#getHasRaceWinner()) {
      const winners = this.state.winners.join(', ').trim();
      this.$raceWinner.textContent = `🏆 최종 우승자: ${winners} 🏆`;
    } else {
      this.$raceWinner.textContent = '';
    }
  }
}
