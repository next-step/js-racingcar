import Component from "../core/component.js";
import template from "../templates/RaceResult.js";
import { RESULT_SELECTORS, HIDDEN_CLASS } from "../constants/index.js";
import { $ } from "../utils/dom.js";

class RaceResult extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    const $initButton = $(RESULT_SELECTORS.INIT_BUTTON, this.$root);
    $initButton.addEventListener("click", this.handlers.onClickInit);
  }

  mount() {
    if (!this.props.isStarted) {
      this.$root.classList.add(HIDDEN_CLASS);
    } else if (this.props.isEnded) {
      this.$root.classList.remove(HIDDEN_CLASS);
      const $winner = $(RESULT_SELECTORS.WINNER_CONTAINER, this.$root);
      $winner.innerText = template(this.props.winners);
    }
  }
}

export default RaceResult;
