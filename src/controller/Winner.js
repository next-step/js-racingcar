import BaseController from './BaseController.js';

export default class Winner extends BaseController {
  constructor(app) {
    super(app);

    this.$raceWinner = document.querySelector('#race-winner');
  }

  // VIEW
  render() {
    if (this.model.getHasRaceWinner()) {
      const winners = this.model.state.winners.join(', ').trim();
      this.$raceWinner.textContent = `🏆 최종 우승자: ${winners} 🏆`;
    } else {
      this.$raceWinner.textContent = '';
    }
  }
}
