import Panel from "./Panel.js";

class Game {
  constructor (parent) {
    this.start(parent)
  }

  start = (parent) => {
    new Panel(parent)
  }
}
export default Game;
