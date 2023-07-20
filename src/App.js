const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const { getArrayNyInput } = require('./utils.js');
const { checkValidNames } = require('./validation.js');
const View = require('./view/view.js');

class App {
  #track;

  #cars = [];

  init() {
    this.#track = new Track();
    this.getCarNames();
  }

  getCarNames() {
    View.getUserInput(this.isValidatedNames.bind(this));
  }

  isValidatedNames(input) {
    const nameList = getArrayNyInput(input);
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

  finishRacing() {}
}

module.exports = App;
