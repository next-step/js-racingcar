import { $ } from '../utils/dom.js';
import { ALERT_MESSAGES } from '../constants/alertMessages.js';

export default function GameResult({ initState, handleResetGame }) {
  this.$gameResultContainer = $('.game-result-container');
  this.$gameWinners = $('.game-winners');
  this.$gameResetButton = $('.game-reset-btn');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { raceFinishedFlag } = this.state;

    this.$gameResultContainer.classList.toggle('hidden', !raceFinishedFlag);
    this.$gameResetButton.disabled = true;
    if (!raceFinishedFlag) return;

    const winners = this.getWinners(this.getWinnerGoGount());
    this.$gameWinners.textContent = winners.map((winner) => winner.carName).join(', ');
    this.showGameEndMessageAndResetButtonActive();
  };

  this.getWinnerGoGount = () => Math.max(...this.state.cars.map((car) => car.goCount));

  this.getWinners = (winnerGoGount) => this.state.cars.filter((car) => car.goCount === winnerGoGount);

  this.showGameEndMessageAndResetButtonActive = (delay = 2000) => {
    setTimeout(() => {
      alert(ALERT_MESSAGES.CONGRATULATION);
      this.$gameResetButton.disabled = false;
    }, delay);
  };

  this.$gameResetButton.addEventListener('click', handleResetGame);
}

