import Component from "../core/component.js";
import {
  NOT_ALLOWED_TIME_ERROR,
  HIDDEN_CLASS,
  INPUT_SELECTOR,
} from "../constants/index.js";
import { $ } from "../utils/dom.js";

class TimeForm extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.$input = $(INPUT_SELECTOR, this.$root);
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("submit", (e) => {
      e.preventDefault();
      const times = Number(this.$input.value);
      if (times <= 0) {
        return alert(NOT_ALLOWED_TIME_ERROR);
      }
      this.$input.disabled = true;
      this.handlers.onSubmit(times);
    });
  }

  mount() {
    if (this.props.isTimeFormOpen) {
      this.$root.classList.remove(HIDDEN_CLASS);
    } else {
      this.$root.classList.add(HIDDEN_CLASS);
      this.$input.disabled = false;
      this.$input.value = "";
    }
  }
}

export default TimeForm;
