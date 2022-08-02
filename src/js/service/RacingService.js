import RemoveTemplate from './RemoveTemplate.js';
import { DELAY_TIME_MS } from '../constants.js';
import { removeHiddenClass } from '../utils.js';

class RacingService {
  constructor(createTemplate, calculate, racingResult) {
    this.createTemplate = createTemplate;
    this.calculate = calculate;
    this.racingResult = racingResult;
    this.winnerList = [];
  }

  getWinnerList(cars, carPlayers) {
    const carsChildLists = [...cars].map((car) => car.childNodes.length);
    const carPlayerTextLists = [...carPlayers].map((carPlayer) => carPlayer.innerText);
    const maxLength = Math.max(...carsChildLists);

    this.winnerList = carPlayerTextLists.filter((item, index) => {
      if (carsChildLists[index] !== maxLength) return;
      return item;
    });
  }

  showGameResult(winnerList) {
    const resultTemplate = this.createTemplate.createRacingResultTemplate(winnerList);
    this.racingResult.insertAdjacentHTML('beforeend', resultTemplate);
    removeHiddenClass(this.racingResult);
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
        this.getWinnerList(cars, carPlayers);
        this.showGameResult(this.winnerList.join(', '));
        this.displayCongratsAlert();
      }
    }, DELAY_TIME_MS.RACING_GAME_INTERVAL);
  }
}

export default RacingService;
