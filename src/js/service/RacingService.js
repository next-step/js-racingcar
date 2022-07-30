import RemoveTemplate from './RemoveTemplate.js';
import { DELAY_TIME_MS } from '../constants.js';

class RacingService {
  constructor(createTemplate, calculate) {
    this.createTemplate = createTemplate;
    this.calculate = calculate;
  }

  startRacingGame(coin) {
    const cars = document.querySelectorAll('.car');
    const carPlayers = document.querySelectorAll('.car-player');

    let count = 1;
    const removeTemplate = new RemoveTemplate();

    const timeoutId = setInterval(() => {
      carPlayers.forEach((carPlayer) => {
        if (this.calculate.isForwardCondition()) {
          carPlayer.insertAdjacentHTML('afterend', this.createTemplate.createForwardTemplate());
        }
      });

      // eslint-disable-next-line no-plusplus
      if (count++ === coin) {
        clearInterval(timeoutId);
        removeTemplate.removeAllSpinners(cars);
      }
    }, DELAY_TIME_MS);
  }
}

export default RacingService;
