const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const { checkValidNames } = require('./validation.js');
const View = require('./view/view.js');

class App {
  track;

  cars = [];

  init() {
    this.track = new Track();
    this.getCarNames();
  }

  getCarNames() {
    View.getUserInput(this.isValidatedNames.bind(this));
  }

  isValidatedNames(input) {
    const nameList = input
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    checkValidNames(nameList);
    nameList.forEach((name) => this.cars.push(new Car(name)));
    this.startRacing();
  }

  startRacing() {}

  finishRacing() {}
}

module.exports = App;
