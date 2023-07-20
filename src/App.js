const Track = require('./model/Track.js');

class App {
  #track;

  #cars;

  init() {
    this.#track = new Track();
  }

  getUserInput() {}

  startRacing() {}

  finishRacing() {}
}

module.exports = App;
