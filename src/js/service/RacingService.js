import { getIntervalTimer } from '../timer.js';

class RacingService {
  constructor(createTemplate, calculate) {
    this.createTemplate = createTemplate;
    this.calculate = calculate;
  }

  startRacingGame(coin) {
    const cars = document.querySelectorAll('.car');
    const carPlayers = document.querySelectorAll('.car-player');

    getIntervalTimer(this.createTemplate, this.calculate, cars, carPlayers, coin);
  }
}

export default RacingService;
