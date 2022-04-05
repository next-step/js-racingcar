import { $ } from '../utils/dom.js';

export default function GameResult({ initState }) {
  this.$gameResultContainer = $('.game-result-container');
  this.$gameWinners = $('.game-winners');

  this.state = initState;
  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.getWinnerGoGount = () => Math.max(...this.state.cars.map((car) => car.goCount));

  this.getWinners = (winnerGoGount) => this.state.cars.filter((car) => car.goCount === winnerGoGount);

  this.render = () => {
    const { raceFinishedFlag } = this.state;
    if (!raceFinishedFlag) return;

    this.$gameResultContainer.classList.toggle('hidden', !raceFinishedFlag);
    const winners = this.getWinners(this.getWinnerGoGount());
    this.$gameWinners.textContent = winners.map((winner) => winner.carName).join(', ');
  };
}
