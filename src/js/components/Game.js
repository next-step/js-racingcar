import Panel from "./Panel.js";

class Game {
  constructor (parent) {
    this._start(parent)
  }

  _start = (parent) => {
    new Panel(parent)
  }
}
export default Game;
