import { $ } from '../utils/helpers.js';
import RacingCars from './RacingCars.js';

export default function GameProcess(track) {
  this.track = track;

  this.setTrack = (newTrack) => {
    this.track = newTrack;
  };

  this.getTrack = () => this.track;
  this.getRacingCars = () => this.RacingCars;

  this.ready = (carNames) => {
    this.RacingCars = new RacingCars(this.track, carNames);
    this.RacingCars.ready();
  };

  this.start = (round, showWinner) => {
    let currentRound = 0;
    const interval = setInterval(() => {
      this.goRound();
      if (++currentRound === round) this.gameEnd(interval, showWinner);
    }, 1000);
  };

  this.goRound = () => {
    this.RacingCars.goRound();
  };

  this.gameEnd = (interval, showWinner) => {
    clearInterval(interval);
    this.RacingCars.gameEnd();
    showWinner(this.RacingCars.getWinner());
    setTimeout(() => {
      alert('축하합니다');
    }, 2000);
  };

  this.reset = () => {
    this.RacingCars.reset();
    this.RacingCars = null;
  };
}
