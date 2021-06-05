import Component from "../core/component.js";
import { NOT_ALLOWED_NAME_ERROR, INPUT_SELECTOR } from "../constants/index.js";
import { nameVaildator } from "../utils/validator.js";
import { $ } from "../utils/dom.js";

class CarNameForm extends Component {
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
      const names = this.$input.value.split(",");
      if (nameVaildator(names)) return alert(NOT_ALLOWED_NAME_ERROR);

      this.$input.disabled = true;
      this.handlers.onSubmit(names);
    });
  }

  mount() {
    if (!this.props.isTimeFormOpen) {
      this.$input.disabled = false;
      this.$input.value = "";
    }
  }
}

export default CarNameForm;
