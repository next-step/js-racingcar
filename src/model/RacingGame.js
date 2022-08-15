import { addCls, removeCls, warnMsg } from "../utils/utils.js";
import Player from "./Player.js";
import { $ } from "../utils/dom.js";
import { MSG } from "../utils/messages.js";

export class RacingGame {
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
    this.nameForm = $(".name-form", this.container);
    this.nameArea = $(".name-area", this.nameForm);
    this.nameInput = $("input", this.nameArea);
    this.nameButton = $("button", this.nameArea);

    this.countForm = $(".count-form", this.container);
    this.countArea = $(".count-area", this.countForm);
    this.countInput = $("input", this.countArea);
    this.countButton = $("button", this.countArea);

    this.playArea = $(".play-area", this.container);
    this.resultArea = $(".result-area", this.container);
    this.resultList = $(".winner-list", this.resultArea);
    this.resultButton = $("button", this.resultArea);
  }
  addEvent() {
    this.nameForm.addEventListener("submit", this.inputName.bind(this));
    this.nameButton.addEventListener("click", this.inputName.bind(this));

    this.countForm.addEventListener("submit", this.inputCount.bind(this));
    this.countButton.addEventListener("click", this.inputCount.bind(this));

    this.resultButton.addEventListener("click", this.resetGame.bind(this));
  }
  inputName(e) {
    e.preventDefault();
    const inputValue = this.nameInput.value.trim();
    this.nameInput.value = inputValue;

    if (!inputValue) {
      warnMsg(MSG.INPUT_PLAYER);
      return;
    }

    const names = inputValue.split(",");
    const isInvalidName = names.some(
      (name) => name.trim().length > this.maxNameLength || !name.trim().length
    );

    if (isInvalidName) {
      warnMsg(MSG.MAX_PLAYER);
      return;
    } else {
      this.nameInput.setAttribute("disabled", true);
      this.nameButton.setAttribute("disabled", true);

      removeCls(this.countArea, "hidden");
      names.forEach((name) => this.players.push(new Player(name)));
      this.countInput.focus();
    }
  }
  inputCount(e) {
    e.preventDefault();
    const inputValue = this.countInput.value;

    if (!inputValue || +inputValue === 0) {
      warnMsg(MSG.INPUT_COUNT);
      return;
    }

    this.gameCount = +inputValue;
    this.countInput.setAttribute("disabled", true);
    this.countButton.setAttribute("disabled", true);
    removeCls(this.playArea, "hidden");

    this.startGame();
  }
  startGame() {
    this.players.forEach((player) => {
      player.setElement();
      this.playArea.appendChild(player.getElement());
    });

    this.timer = setInterval(this.setPlayerState.bind(this), this.gameTerm);
  }
  setPlayerState() {
    this.players.forEach((player) => player.setState());
    this.gameCount--;

    if (this.gameCount <= 0) {
      this.endGame();
    }
  }
  endGame() {
    clearInterval(this.timer);

    let winnerLocation = 0;
    this.players.forEach((player) => {
      if (winnerLocation < player.location) {
        winnerLocation = player.location;
      }
      player.endGame();
    });
    this.winner = this.players.filter(
      (player) => player.location === winnerLocation
    );
    this.setWinner();
  }
  setWinner() {
    removeCls(this.resultArea, "hidden");
    this.resultList.textContent = this.winner.map((player) => player.name);
    setTimeout(() => alert(MSG.CONGRATULATIONS), this.resultAlertTerm);
  }
  resetGame() {
    this.resetNameArea();
    this.resetCountArea();
    this.resetPlayArea();
    this.resetResultArea();
  }
  resetNameArea() {
    this.nameInput.removeAttribute("disabled");
    this.nameButton.removeAttribute("disabled");
    this.nameInput.value = null;
  }
  resetCountArea() {
    this.countInput.removeAttribute("disabled");
    this.countButton.removeAttribute("disabled");
    this.countInput.value = null;
    addCls(this.countArea, "hidden");
  }
  resetPlayArea() {
    this.playArea.innerHTML = null;
    addCls(this.playArea, "hidden");
  }
  resetResultArea() {
    addCls(this.resultArea, "hidden");
  }
}
