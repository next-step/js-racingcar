import Panel from "./Panel.js";

class Game {
  constructor (parent) {
    this.parent = parent;
    this.start()
  }

  start = () => {
    new Panel(this.parent)
  }
}
export default Game;
