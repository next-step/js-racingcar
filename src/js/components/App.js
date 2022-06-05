import { CLASS_NAME, MESSAGE, SELECTOR } from '../utils/constants.js';
import { wait } from '../utils/helper.js';
import {
  isInvalidCarName,
  isOverMaxCount,
  isUnderMinCount,
} from '../utils/validation.js';
import Racing from './Racing.js';

const $form = document.querySelector(`form.${CLASS_NAME.USER_FORM}`);
const $carNameInput = $form.querySelector(SELECTOR.CAR_NAME_INPUT);
const $carNameButton = $form.querySelector(SELECTOR.CAR_NAME_BUTTON);
const $tryCountFieldset = $form.querySelector(SELECTOR.TRY_COUNT_FILEDSET);
const $tryCountInput = $form.querySelector(SELECTOR.TRY_COUNT_INPUT);
const $tryCountButton = $form.querySelector(SELECTOR.TRY_COUNT_BUTTON);
const $racingBoard = document.querySelector(
  `section.${CLASS_NAME.RACING_BOARD}`
);
const $racingBoardContent = $racingBoard.querySelector('div.d-flex');
const $winnerSection = document.querySelector(`section.${CLASS_NAME.WINNER}`);
const $winner = $winnerSection.querySelector('h2');
const $resetButton = document.querySelector(
  `button.${CLASS_NAME.RESET_BUTTON}`
);

const initialState = {
  carNames: [],
  racingBoard: {},
};

Object.freeze(initialState);

class App {
  state;

  constructor() {
    this.state = { ...initialState };

    $racingBoardContent.replaceChildren();

    this.initializeEventListner();
  }

  createRacingCarElement(carName) {
    const $racingCar = document.createElement('div');
    $racingCar.classList.add('mr-2');

    const $carPlayer = document.createElement('div');
    $carPlayer.classList.add('car-player');
    $carPlayer.textContent = carName;

    $racingCar.appendChild($carPlayer);

    return $racingCar;
  }

  createSpinnerElement() {
    const $spinner = document.createElement('div');
    $spinner.className = 'd-flex justify-center mt-3';
    const $spinnerContainer = document.createElement('div');
    $spinnerContainer.className = 'relative spinner-container';
    const $spinnerIcon = document.createElement('span');
    $spinnerIcon.className = 'material spinner';

    $spinnerContainer.appendChild($spinnerIcon);
    $spinner.appendChild($spinnerContainer);

    return $spinner;
  }

  createMovementElement() {
    const $advance = document.createElement('div');
    $advance.className = 'forward-icon mt-2';
    $advance.textContent = '⬇️️';

    return $advance;
  }

  handleResetButtonClick() {
    $carNameInput.removeAttribute('disabled');
    $carNameButton.removeAttribute('disabled');
    $tryCountFieldset.classList.add('hide');

    $tryCountInput.removeAttribute('disabled');
    $tryCountButton.removeAttribute('disabled');
    $racingBoard.classList.add('hide');

    $winnerSection.classList.add('hide');

    $carNameInput.value = '';
    $tryCountInput.value = '';

    this.setState({ ...initialState });
  }

  handleCarNameButtonClick() {
    const carNames = $carNameInput.value.split(',');

    const isHaveInvalidCarName = carNames.some((carName) =>
      isInvalidCarName(carName)
    );

    if (isHaveInvalidCarName) {
      alert(MESSAGE.INVALID_CAR_NAME);
      return;
    }

    $carNameInput.setAttribute('disabled', true);
    $carNameButton.setAttribute('disabled', true);
    $tryCountFieldset.classList.remove('hide');
    $tryCountInput.focus();

    this.state.carNames = carNames.slice(0);
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { carNames } = this.state;

    const isCarNameEmpty = this.state.carNames.length === 0;

    if (isCarNameEmpty) {
      this.handleCarNameButtonClick();
      return;
    }

    const tryCount = $tryCountInput.value;

    if (isOverMaxCount(tryCount)) {
      alert(MESSAGE.MAX_COUNT);
      return;
    }

    if (isUnderMinCount(tryCount)) {
      alert(MESSAGE.MIN_COUNT);
      return;
    }

    $tryCountInput.setAttribute('disabled', true);
    $tryCountButton.setAttribute('disabled', true);
    $racingBoard.classList.remove('hide');

    const racing = new Racing(carNames);

    this.renderRacingBoard();

    for (let i = 1; i <= tryCount; i++) {
      const racingBoard = racing.runRacingOnce();

      this.setState({
        ...this.state,
        racingBoard,
      });

      await wait(1000);
      const isLast = i === Number(tryCount);
      this.renderRacingBoard(isLast);
    }

    const winners = racing.getWinners();
    this.renderWinner(winners);

    await wait(1000);
    alert(MESSAGE.CONGRATS);
  }

  renderRacingBoard(isLast = false) {
    const { carNames, racingBoard } = this.state;

    $racingBoardContent.replaceChildren();

    const $racingCarElements = carNames.map((carName) => {
      const $racingCarElement = this.createRacingCarElement(carName);

      const advanceCount = racingBoard[carName];
      Array.from({ length: advanceCount }).forEach(() => {
        const $movementElement = this.createMovementElement();

        $racingCarElement.appendChild($movementElement);
      });

      if (!isLast) {
        const $spinnerElement = this.createSpinnerElement();
        $racingCarElement.appendChild($spinnerElement);
      }

      return $racingCarElement;
    });

    $racingBoardContent.append(...$racingCarElements);
  }

  renderWinner(winners) {
    $winnerSection.classList.remove('hide');

    $winner.textContent = `🏆 최종 우승자: ${winners.join(',')} 🏆`;
  }

  initializeEventListner() {
    $form.addEventListener('submit', this.handleSubmit.bind(this));
    $carNameButton.addEventListener(
      'click',
      this.handleCarNameButtonClick.bind(this)
    );
    $resetButton.addEventListener(
      'click',
      this.handleResetButtonClick.bind(this)
    );
  }

  setState(newState) {
    this.state = Object.assign({}, newState);
  }
}

export default App;
