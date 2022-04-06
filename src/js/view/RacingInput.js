import { validNames } from '../service/index.js';
import { getSelector } from '../utils/index.js';

class RacingInput {
  constructor(store) {
    this.store = store;
    getSelector('#racing-name button').addEventListener('click', this.sendCarNames);
  }

  sendCarNames = (e) => {
    e.preventDefault();

    const $input = getSelector('#racing-name input');
    const $countArticle = getSelector('#racing-count');
    const carNames = $input.value.split(',');
    const { errorMessage } = validNames(carNames);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    e.target.disabled = true;
    $input.disabled = true;
    $countArticle.classList.remove('hidden');
    this.store.setState({ carNames });
  };
}

export default RacingInput;
