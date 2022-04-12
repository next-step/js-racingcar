import Store from './store/index.js';
import { createCarBoard, checkCarNamesIsValid, getWinners } from './service/index.js';
import { $ } from './utils/index.js';
import { getCardBoardTemplate, getWinnerNamesTemplate } from './view/Template.js';

class App {
  constructor() {
    this.store = new Store();
    this.$nameInput = $('#racing-name input');
    this.$countInput = $('#racing-count input');
    $('#racing-name form').addEventListener('submit', this.sendCarNames);
    $('#racing-count form').addEventListener('submit', this.sendChallengeCount);
    $('#racing-result button').addEventListener('click', this.reStart);

    $('#racing-name input').focus();
  }

  sendChallengeCount = (e) => {
    e.preventDefault();
    const challengeCount = this.$countInput.value;
    const carNames = this.$nameInput.value.split(',');
    const carBoard = createCarBoard({ names: carNames, count: challengeCount });
    const winners = getWinners(carBoard);

    this.$countInput.disabled = true;
    $('#racing-count button').disabled = true;
    $('#racing-board').classList.remove('hidden');
    this.store.setState({ carBoard, winners });
    this.carBoardRender();
    this.carResultRender();
  };

  sendCarNames = (e) => {
    e.preventDefault();

    const carNames = this.$nameInput.value.split(',');
    const { errorMessage } = checkCarNamesIsValid(carNames);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    $('#racing-name button').disabled = true;
    this.$nameInput.disabled = true;
    $('#racing-count').classList.remove('hidden');
    $('#racing-count input').focus();
  };

  reStart = () => {
    this.store.reset();

    this.$nameInput.value = '';
    this.$nameInput.disabled = false;
    $('#racing-name button').disabled = false;

    this.$countInput.value = '';
    $('#racing-count').classList.add('hidden');
    this.$countInput.disabled = false;
    $('#racing-count button').disabled = false;

    this.carBoardRender();

    $('#racing-result').classList.add('hidden');

    this.$nameInput.focus();
  };

  carBoardRender() {
    $('#racing-board').innerHTML = getCardBoardTemplate(this.store.state.carBoard);
  }

  carResultRender() {
    $('#racing-result').classList.remove('hidden');
    $('#racing-result #winner-names').innerHTML = getWinnerNamesTemplate(this.store.state.winners);
  }
}

export default App;
