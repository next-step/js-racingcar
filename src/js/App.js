import Store from './store/index.js';
import { createCarBoard, validNames } from './service/index.js';
import { $ } from './utils/index.js';
import { getCardBoardTemplate } from './view/Template.js';

class App {
  constructor() {
    this.store = new Store();
    this.$nameInput = $('#racing-name input');
    this.$countInput = $('#racing-count input');
    $('#racing-name form').addEventListener('submit', this.sendCarNames);
    $('#racing-count form').addEventListener('submit', this.sendChallengeCount);

    $('#racing-name input').focus();
  }

  sendChallengeCount = (e) => {
    e.preventDefault();
    const challengeCount = this.$countInput.value;
    const carBoard = createCarBoard({ names: this.store.state.carNames, count: challengeCount });

    this.$countInput.disabled = true;
    $('#racing-count button').disabled = true;
    $('#racing-board').classList.remove('hidden');
    this.store.setState({ challengeCount, carBoard });
    this.carBoardRender();
  };

  sendCarNames = (e) => {
    e.preventDefault();

    const $countArticle = $('#racing-count');
    const carNames = this.$nameInput.value.split(',');
    const { errorMessage } = validNames(carNames);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    $('#racing-name button').disabled = true;
    this.$nameInput.disabled = true;
    $countArticle.classList.remove('hidden');
    this.store.setState({ carNames });
    $('#racing-count input').focus();
  };

  carBoardRender() {
    $('#racing-board').innerHTML = getCardBoardTemplate(this.store.state.carBoard);
  }
}

export default App;
