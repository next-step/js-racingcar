import Component from "../core/component.js";
import { $ } from "../utils/dom.js";

class CarNameForm extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.$input = $("input", this.$root);
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("submit", (e) => {
      e.preventDefault();
      const names = this.$input.value.split(",");
      const hasNotAllowedName =
        names.findIndex((name) => name.length > 5 || name.length === 0) !== -1;
      if (hasNotAllowedName) {
        return alert("자동차 이름은 5자 이하, 1자 이상이어야 해요");
      }
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
