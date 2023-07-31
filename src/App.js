const Validator = require('./Validator.js');
const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const WinnerChecker = require('./model/WinnerChecker.js');
const View = require('./view/view.js');
const { splitByStandard } = require('./utils.js');
const { MESSAGES } = require('./constants/messages.js');

class App {
  #track;

  #winnerChecker = new WinnerChecker();

  #cars = [];

  init() {
    this.#reset();
    this.#startGame();
  }

  #startGame() {
    this.#getCarNames();
  }

  async #getUserInput(message) {
    const userInput = await View.getUserInput(message);
    return userInput;
  }

  #checkValidation(target, validator, trigger) {
    try {
      validator(target);
    } catch (err) {
      this.#showError(err, trigger);
    }
  }

  #getModel(trigger, Model, ...args) {
    try {
      return new Model(...args);
    } catch (err) {
      return this.#showError(err, trigger);
    }
  }

  async #getCarNames() {
    const names = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_CARS);
    const nameList = splitByStandard(names);

    this.#checkValidation(nameList, Validator.isValidList, this.#getCarNames);
    this.#setCars(nameList);
  }

  #setCars(names) {
    this.#cars = names.map((name) => this.#getModel(this.#getCarNames, Car, name));
    const completed = this.#cars.every((car) => car);

    if (completed) this.#getRound();
  }

  async #getRound() {
    const round = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_ROUND);

    this.#setTrack(round);
  }

  #setTrack(round) {
    this.#track = this.#getModel(this.#getRound, Track, round);
    if (this.#track) this.#startRacing();
  }

  #startRacing() {
    View.renderLineBreak();
    View.renderStartComment();

    while (!this.#track.isEndRound()) {
      this.#processRound();
    }

    this.#finishRacing();
  }

  #processRound() {
    this.#cars.forEach((car) => {
      car.moveByRandomNumber();
      View.renderCarDistance(car);
    });

    this.#track.increaseRound();
    View.renderLineBreak();
  }

  #finishRacing() {
    this.#winnerChecker.addResult(this.#cars);
    const { winners } = this.#winnerChecker;
    View.renderResult(winners);

    process.exit();
  }

  #showError(err, trigger) {
    View.renderError(err.message);
    trigger.call(this);
  }

  #reset() {
    this.#cars = [];
    this.#winnerChecker.reset();
  }
}

module.exports = App;
