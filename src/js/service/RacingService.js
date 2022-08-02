import RemoveTemplate from './RemoveTemplate.js';
import { DELAY_TIME_MS } from '../constants.js';

class RacingService {
  constructor(createTemplate, calculate) {
    this.createTemplate = createTemplate;
    this.calculate = calculate;
  }

  displayCongratsAlert() {
    const timeoutId = setTimeout(() => {
      alert('🎇🎇🎇🎇 축하합니다! 🎇🎇🎇🎇');
      clearTimeout(timeoutId);
    }, DELAY_TIME_MS.RACING_GAME_CONGRATS_TIMEOUT);
  }

  startRacingGame(coin) {
    const cars = document.querySelectorAll('.car');
    const carPlayers = document.querySelectorAll('.car-player');

    let count = 1;
    const removeTemplate = new RemoveTemplate();

    const intervalTimeId = setInterval(() => {
      carPlayers.forEach((carPlayer) => {
        if (this.calculate.isForwardCondition()) {
          carPlayer.insertAdjacentHTML('afterend', this.createTemplate.createForwardTemplate());
        }
      });

      // eslint-disable-next-line no-plusplus
      if (count++ === coin) {
        clearInterval(intervalTimeId);
        removeTemplate.removeAllSpinners(cars);
        this.displayCongratsAlert();
      }
    }, DELAY_TIME_MS.RACING_GAME_INTERVAL);
  }
}

export default RacingService;
