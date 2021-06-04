import Component from "../core/component.js";
import { $ } from "../utils/dom.js";

class TimeForm extends Component {
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
      const times = Number(this.$input.value);
      if (times <= 0) {
        return alert("레이싱 횟수가 너무 적습니다. 1회 이상이어야해요.");
      }
      this.$input.disabled = true;
      this.handlers.onSubmit(times);
    });
  }

  mount() {
    if (this.props.isTimeFormOpen) {
      this.$root.classList.remove("hidden");
    } else {
      this.$root.classList.add("hidden");
      this.$input.disabled = false;
      this.$input.value = "";
    }
  }
}

export default TimeForm;
