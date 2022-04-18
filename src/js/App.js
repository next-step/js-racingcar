import { $ } from './utils/index.js';
import { getCardBoardTemplate, getWinnerNamesTemplate } from './view/Template.js';
import { hiddenEl, showEl } from './view/common.js';
import CarManager from './service/CarManager.js';

class App {
  constructor() {
    this.cars = null;
    this.carManager = new CarManager();
    this.$nameInput = $('#racing-name input');
    this.$countInput = $('#racing-count input');
    $('#racing-name form').addEventListener('submit', this.sendCarNames);
    $('#racing-count form').addEventListener('submit', this.sendChallengeCount);
    $('#racing-result button').addEventListener('click', this.reset);

    $('#racing-name input').focus();
  }

  sendChallengeCount = (e) => {
    e.preventDefault();
    const challengeCount = this.$countInput.value;

    this.carManager.forwardCars({ cars: this.cars, count: Number(challengeCount) });

    this.carBoardRender();
    this.carResultRender();
  };

  sendCarNames = (e) => {
    e.preventDefault();
    const carNames = this.$nameInput.value.split(',');
    this.cars = this.carManager.createCars(carNames);
    const isValidCarNames = this.cars.every((car) => car.name);

    if (isValidCarNames) {
      this.carNamesRender();
    }
  };

  reset = () => {
    this.cars = null;

    this.resetCarBoard();
    this.resetCarCount();
    this.resetCardName();
    this.resetResult();

    this.$nameInput.focus();
  };

  resetCardName() {
    this.$nameInput.value = '';
    this.$nameInput.disabled = false;
    $('#racing-name button').disabled = false;
  }

  resetCarCount() {
    this.$countInput.value = '';
    hiddenEl($('#racing-count'));
    this.$countInput.disabled = false;
    $('#racing-count button').disabled = false;
  }

  resetCarBoard() {
    hiddenEl($('#racing-board'));
  }

  resetResult() {
    hiddenEl($('#racing-result'));
  }

  carNamesRender() {
    $('#racing-name button').disabled = true;
    this.$nameInput.disabled = true;
    showEl($('#racing-count'));
    $('#racing-count input').focus();
  }

  carBoardRender() {
    this.$countInput.disabled = true;
    $('#racing-count button').disabled = true;
    showEl($('#racing-board'));

    $('#racing-board').innerHTML = getCardBoardTemplate(this.cars);
  }

  carResultRender() {
    showEl($('#racing-result'));

    const winners = this.carManager.getWinners(this.cars);
    $('#racing-result #winner-names').innerHTML = getWinnerNamesTemplate(winners);
  }
}

export default App;
