const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const WinnerChecker = require('./model/WinnerChecker.js');
const { getArrayByInput } = require('./utils.js');
const { checkValidNames } = require('./validation.js');
const View = require('./view/view.js');

class App {
  #track;

  #cars = [];

  #winners = [];

  init() {
    this.#track = new Track();
    this.getCarNames();
  }

  getCarNames() {
    View.getUserInput(this.isValidatedNames.bind(this));
  }

  isValidatedNames(input) {
    const nameList = getArrayByInput(input);
    checkValidNames(nameList);
    nameList.forEach((name) => this.#cars.push(new Car(name)));

    this.startRacing();
  }

  startRacing() {
    View.renderLineBreak();
    View.renderStartComment();

    while (!this.#track.isEndRound()) {
      this.processRound();
    }

    this.finishRacing();
  }

  processRound() {
    this.#cars.forEach((car) => {
      const isMoved = car.isMoved();
      if (isMoved) car.move();
      const { name, distance } = car;
      View.renderCarDistance(name, distance);
    });

    this.#track.increaseRound();
    View.renderLineBreak();
  }

  getWinners() {
    const winners = WinnerChecker.getWinners(this.#cars);
    this.#winners = winners;
  }

  finishRacing() {
    this.getWinners();
    View.renderResult(this.#winners);
    process.exit();
  }
}

module.exports = App;
