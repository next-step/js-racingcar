import Component from "../core/component.js";
import { $ } from "../utils/dom.js";

class TimeForm extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    const $input = $("input", this.$root);
    this.$root.addEventListener("submit", (e) => {
      e.preventDefault();
      const times = Number($input.value);
      if (times <= 0) {
        return alert("레이싱 횟수가 너무 적습니다. 1회 이상이어야해요.");
      }
      $input.disabled = true;
      this.handlers.onSubmit(times);
    });
  }

  mount() {
    if (this.props.isTimeFormOpen) {
      this.$root.classList.remove("hidden");
    } else {
      this.$root.classList.add("hidden");
    }
  }
}

export default TimeForm;
