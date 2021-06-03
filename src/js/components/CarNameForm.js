import Component from "../core/component.js";
import { $ } from "../utils/dom.js";

class CarNameForm extends Component {
  constructor($root, handlers) {
    super();
    this.$root = $root;
    this.handlers = handlers;
  }

  bindEvents() {
    const $input = $("input", this.$root);
    this.$root.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}

export default CarNameForm;
