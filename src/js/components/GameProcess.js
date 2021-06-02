import { $ } from '../utils/helpers.js';
import RacingCars from './RacingCars.js';

export default function GameProcess() {
  this.racingTrack = $('.racing-track');

  this.ready = (carNames) => {
    this.RacingCars = new RacingCars(carNames);
    this.RacingCars.ready(this.racingTrack);
  };

  this.goRound = () => {
    this.RacingCars.goRound();
  };

  this.gameEnd = (interval, showWinner) => {
    clearInterval(interval);
    this.RacingCars.gameEnd();
    const winners = this.RacingCars.getWinner();
    showWinner(winners);
    setTimeout(() => {
      alert('축하합니다');
    }, 2000);
  };

  this.start = (round, showWinner) => {
    let currentRound = 0;
    const interval = setInterval(() => {
      this.goRound();
      if (++currentRound === round) this.gameEnd(interval, showWinner);
    }, 1000);
    return 'fin';
  };

  this.reset = () => {
    this.RacingCars.reset();
    this.RacingCars = null;
  };
}
