import RacingGameApp from "./RacingGameApp.js";
import { $ } from "./utils/index.js"

class Index {
  constructor(selector) {
    this.$elem = $(selector);
    if (!this.$elem) throw this.$elem; //

    this.$elem.insertAdjacentHTML("beforeend", `<racing-game-app></racing-game-app>`);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new Index("#app");
})
