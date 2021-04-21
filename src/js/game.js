import { $, addCls, removeCls, warnMsg, alert } from './util/utils.js';
import { MSG } from './util/constant.js';
import Player from './player.js';

export default class RacingGame {
  constructor(container) {
    this.container = container;
    this.maxNameLength = 5;
    this.players = [];
    this.gameCount = 0;
    this.gameTerm = 1000;
    this.resultAlertTerm = 2000;

    this.setElement();
    this.addEvent();
  }
  setElement() {
    this.nameArea = $('.name-area', this.container);
    this.nameInput = $('input', this.nameArea);
    this.nameButton = $('button', this.nameArea);

    this.countArea = $('.count-area', this.container);
    this.countInput = $('input', this.countArea);
    this.countButton = $('button', this.countArea);

    this.playArea = $('.play-area', this.container);
    this.resultArea = $('.result-area', this.container);
    this.resultList = $('.winner-list', this.resultArea);
    this.resultButton = $('button', this.resultArea);
  }
  addEvent() {
    this.nameButton.addEventListener('click', this.inputName.bind(this));
    this.countButton.addEventListener('click', this.inputCount.bind(this));
    this.resultButton.addEventListener('click', this.resetGame.bind(this));
  }
  inputName() {
    const inputValue = this.nameInput.value.trim();
    this.nameInput.value = inputValue;

    if (!inputValue) {
      warnMsg(MSG.INPUT_PLAYER);
      return;
    }

    const names = inputValue.split(',');
    const isInvalidName = names.some(
      name => name.trim().length > this.maxNameLength || !name.trim().length,
    );

    if (isInvalidName) {
      warnMsg(MSG.MAX_PLAYER);
      return;
    } else {
      this.nameInput.setAttribute('disabled', true);
      this.nameButton.setAttribute('disabled', true);

      removeCls(this.countArea, 'd-none');
      names.forEach(name => this.players.push(new Player(name)));
    }
  }
  inputCount() {
    const inputValue = this.countInput.value;

    if (!inputValue || +inputValue === 0) {
      warnMsg(MSG.INPUT_COUNT);
      return;
    }

    this.gameCount = +inputValue;
    this.countInput.setAttribute('disabled', true);
    this.countButton.setAttribute('disabled', true);
    removeCls(this.playArea, 'd-none');

    this.startGame();
  }
  startGame() {
    this.players.forEach(player => {
      player.setElement();
      this.playArea.appendChild(player.getElement());
    });

    this.timer = setInterval(this.setPlayerState.bind(this), this.gameTerm);
  }
  setPlayerState() {
    this.players.forEach(player => player.setState());
    this.gameCount--;

    if (this.gameCount <= 0) {
      this.endGame();
    }
  }
  endGame() {
    clearInterval(this.timer);

    let winnerLocation = 0;
    this.players.forEach(player => {
      if (winnerLocation < player.location) {
        winnerLocation = player.location;
      }
      player.endGame();
    });
    this.winner = this.players.filter(player => player.location === winnerLocation);
    this.setWinner();
  }
  setWinner() {
    removeCls(this.resultArea, 'd-none');
    this.resultList.textContent = this.winner.map(player => player.name);
    setTimeout(() => alert(MSG.CONGRATULATIONS), this.resultAlertTerm);
  }
  resetGame() {
    this.resetNameArea();
    this.resetCountArea();
    this.resetPlayArea();
    this.resetResultArea();
  }
  resetNameArea() {
    this.nameInput.removeAttribute('disabled');
    this.nameButton.removeAttribute('disabled');
    this.nameInput.value = null;
  }
  resetCountArea() {
    this.countInput.removeAttribute('disabled');
    this.countButton.removeAttribute('disabled');
    this.countInput.value = null;
    addCls(this.countArea, 'd-none');
  }
  resetPlayArea() {
    this.playArea.innerHTML = null;
    addCls(this.playArea, 'd-none');
  }
  resetResultArea() {
    addCls(this.resultArea, 'd-none');
  }
}
