const Validator = require('./Validator.js');
const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const WinnerChecker = require('./model/WinnerChecker.js');
const { sliceByStandard } = require('./utils.js');
const View = require('./view/view.js');

class App {
  #track;

  #cars = [];

  #winners = [];

  init() {
    this.#reset();
    this.#track = new Track();
    this.#getCarNames();
  }

  #getCarNames() {
    View.getUserInput(this.#checkValidatedNames.bind(this));
  }

  #checkValidatedNames(input) {
    const nameList = sliceByStandard(input);

    try {
      Validator.isValidNames(nameList);

      this.#setCars(nameList);
      this.#startRacing();
    } catch (err) {
      throw new Error(err);
    }
  }

  #setCars(names) {
    names.forEach((name) => this.#cars.push(new Car(name)));
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
      const isMoved = car.isMoved();
      if (isMoved) car.move();

      const { name, distance } = car;
      View.renderCarDistance(name, distance);
    });

    this.#track.increaseRound();
    View.renderLineBreak();
  }

  #getWinners() {
    const winners = WinnerChecker.getWinners(this.#cars);
    this.#winners = winners;
  }

  #finishRacing() {
    this.#getWinners();
    View.renderResult(this.#winners);

    process.exit();
  }

  #reset() {
    this.#cars = [];
    this.#winners = [];
    this.#track = null;
  }
}

module.exports = App;
