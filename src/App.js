const validator = require('./validator.js');
const Car = require('./domain/model/Car.js');
const Track = require('./domain/model/Track.js');
const WinnerChecker = require('./domain/model/WinnerChecker.js');
const view = require('./view/view.js');
const { splitByStandard, getRandomNumber } = require('./utils.js');
const { MESSAGES } = require('./constants/messages.js');
const utils = require('./utils.js');

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
    const userInput = await view.getUserInput(message);
    return userInput;
  }

  #checkValidation({ target, validator }, trigger) {
    try {
      validator(target);
    } catch (err) {
      this.#showError(err, trigger);
    }
  }

  async #getCarNames() {
    const names = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_CARS);
    const nameList = splitByStandard(names);

    this.#checkValidation({ target: nameList, validator: validator.checkValidCarList }, () => this.#getCarNames());
    this.#setCars(nameList);
  }

  #setCars(names) {
    try {
      this.#cars = names.map((name) => new Car(name));
      this.#getRound();
    } catch (err) {
      this.#showError(err, () => this.#getCarNames());
    }
  }

  async #getRound() {
    const round = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_ROUND);

    this.#setTrack(round);
  }

  #setTrack(round) {
    try {
      this.#track = new Track(round);
      this.#startRacing();
    } catch (err) {
      this.#showError(err, () => this.#getRound());
    }
  }

  #startRacing() {
    view.renderLineBreak();
    view.renderStartComment();

    while (!this.#track.isEndRound()) {
      this.#processRound();
    }

    this.#finishRacing();
  }

  #processRound() {
    this.#cars.forEach((car) => {
      const power = utils.getRandomNumber();
      car.move(power);

      view.renderCarDistance(car);
    });

    this.#track.increaseRound();
    view.renderLineBreak();
  }

  #finishRacing() {
    this.#winnerChecker.addResult(this.#cars);
    const { winners } = this.#winnerChecker;

    view.renderResult(winners);

    process.exit();
  }

  #showError = (err, trigger) => {
    view.renderError(err.message);
    trigger();
  };

  #reset() {
    this.#cars = [];
    this.#winnerChecker.reset();
  }
}

module.exports = App;
