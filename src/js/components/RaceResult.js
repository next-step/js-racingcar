import Component from "../core/component.js";
import { $ } from "../utils/dom.js";

class RaceResult extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    const $initButton = $("#init-button", this.$root);
    $initButton.addEventListener("click", this.handlers.onClickInit);
  }

  mount() {
    if (!this.props.isStarted) {
      this.$root.classList.add("hidden");
    } else if (this.props.isEnded) {
      this.$root.classList.remove("hidden");
      const $winner = $("#winner", this.$root);
      $winner.innerText = generator(this.props.winners);
    }
  }
}

export default RaceResult;

const generator = (winners) => {
  winners = winners.join(",");
  return `🏆 최종 우승자는 ${winners} 🏆 "`;
};
