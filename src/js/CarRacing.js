"use strict";

import templates from "./utils/templates.js";
import { $ } from "./utils/domSelector.js";
import errorAlerts from "./utils/errorAlerts.js";

export default class CarRacing {
  constructor() {
    this.$app = $("#app");

    this.$carNamesInput = $("#car-names-input");
    this.$carNamesSubmitButton = $("#car-names-submit");
    this.$tryAmountInput = $("#try-amount-input");
    this.$tryAmountSubmitButton = $("#try-amount-submit");
    this.$tryAmountFieldset = $("fieldset.hide");
    this.$gameScreen = $("#game-screen");
    this.$gameResult = $("#game-result");

    this.$app.addEventListener("click", this.bindEvent);

    this.carNames = [];
    this.tryAmount = null;
    this.result = [];
  }

  bindEvent = ({ target }) => {
    if (target.closest("#car-names-submit")) {
      this.getCarNamesFromUser();
    }
    if (target.closest("#try-amount-submit")) {
      this.getTryAmountFromUser();
    }
    if (target.closest("#reset")) {
      this.reset();
    }
  };

  /**
   * 유저에게 자동차 이름 리스트를 받습니다.
   * 자동차 이름이 유효하지 않다면 경고문을 보여주고,
   * 유효하다면 멤버 변수에 할당하고 시도 횟수 fieldset을 유저에게 보여줍니다.
   */
  getCarNamesFromUser = () => {
    const _carNames = this.$carNamesInput.value.split(",");

    let trimmedCarNamesList = [];
    for (let name of _carNames) {
      const trimmedCarName = name.trim();
      if (trimmedCarName.length > 5 || trimmedCarName.length === 0) {
        trimmedCarNamesList = [];
        errorAlerts.invalidCarName();
        break;
      }
      trimmedCarNamesList.push(trimmedCarName);
    }

    if (trimmedCarNamesList.length !== 0) {
      this.carNames = trimmedCarNamesList;
      this.$carNamesInput.setAttribute("disabled", true);
      this.$carNamesSubmitButton.setAttribute("disabled", true);
      this.$tryAmountFieldset.classList.remove("hide");
    }
  };

  /**
   * 유저에게 시도할 휫수를 받습니다.
   * 횟수가 1 미만이라면 경고문을 보여주고,
   * 그렇지 않다면 멤버 변수에 할당하고 게임을 시작합니다.
   */
  getTryAmountFromUser = () => {
    const _tryAmount = this.$tryAmountInput.value;

    if (_tryAmount < 1) {
      errorAlerts.invalidTryAmount();
      return;
    }

    this.tryAmount = _tryAmount;
    this.$tryAmountInput.setAttribute("disabled", true);
    this.$tryAmountSubmitButton.setAttribute("disabled", true);
    this.initGame();
  };

  reset = () => {
    this.$carNamesInput.value = "";
    this.$tryAmountInput.value = "";
    this.$tryAmountFieldset.classList.add("hide");
    this.$carNamesInput.removeAttribute("disabled");
    this.$carNamesSubmitButton.removeAttribute("disabled");
    this.$tryAmountInput.removeAttribute("disabled");
    this.$tryAmountSubmitButton.removeAttribute("disabled");
    this.$gameScreen.innerHTML = "";
    this.$gameResult.innerHTML = "";
    this.result = [];
  };

  /**
   * Games
   */
  initGame = () => {
    let initialCarGameHTML = "";
    this.carNames.forEach((name) => {
      initialCarGameHTML += templates.car(name);
    });

    this.$gameScreen.innerHTML += initialCarGameHTML;
    this.proceedGame();
  };

  proceedGame = () => {
    const round = setInterval(() => {
      [...this.$gameScreen.children].forEach((car) => {
        let randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber >= 4) {
          car.removeChild($(".spinner", car));
          car.innerHTML += templates.goAhead();
          car.innerHTML += templates.spinner();
        }
      });
      this.tryAmount--;
    }, 1000);

    setTimeout(() => {
      this.endGame(round);
    }, this.tryAmount * 1000);
  };

  endGame = (asyncFunc) => {
    clearInterval(asyncFunc);
    [...this.$gameScreen.children].forEach((car) => {
      car.removeChild($(".spinner", car));
      this.result.push({
        name: car.children[0].innerText,
        win: car.children.length - 1,
      });
    });

    this.showResult();
  };

  /**
   * Show result
   */
  showResult = () => {
    let sortedArray = this.result.sort((a, b) => b.win - a.win);
    let winner = [];
    sortedArray
      .filter((elem) => elem.win === sortedArray[0].win)
      .forEach((elem) => winner.push(elem.name));

    this.$gameResult.innerHTML += templates.result(winner.join(", "));

    setTimeout(() => alert("🎇🎇🎇🎇축하합니다!🎇🎇🎇🎇"), 2000);
  };
}
