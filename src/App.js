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

  async #getCarNames() {
    const names = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_CARS);
    const nameList = splitByStandard(names);

    this.#checkValidation(nameList, Validator.isValidList, () => this.#getCarNames());
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

  #showError = (err, trigger) => {
    View.renderError(err.message);
    trigger();
  };

  #reset() {
    this.#cars = [];
    this.#winnerChecker.reset();
  }
}

module.exports = App;
