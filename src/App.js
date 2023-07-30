const Validator = require('./Validator.js');
const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const WinnerChecker = require('./model/WinnerChecker.js');
const View = require('./view/View.js');
const { splitByStandard } = require('./utils.js');
const { MESSAGES } = require('./constants/messages.js');

class App {
  #track = new Track();

  #winnerChecker = new WinnerChecker();

  #cars = [];

  init() {
    this.#reset();
    this.#startGame();
  }

  async #getUserInput(message) {
    const userInput = await View.getUserInput(message);
    return userInput;
  }

  async #startGame() {
    const names = await this.#getUserInput(MESSAGES.REQUEST.ENTER_THE_CARS);
    const nameList = splitByStandard(names);

    this.#checkValidation(nameList, Validator.isValidList);
    this.#setCars(nameList);

    this.#startRacing();
  }

  #checkValidation(target, validator) {
    try {
      validator(target);
    } catch (err) {
      View.renderError(err.message);
      process.exit();
    }
  }

  #setCars(names) {
    this.#cars = names.map((name) => new Car(name));
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

  #reset() {
    this.#cars = [];
    this.#track.reset();
    this.#winnerChecker.reset();
  }
}

module.exports = App;
