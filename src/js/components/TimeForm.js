import Component from "../core/component.js";

class TimeForm extends Component {
  constructor($root, handlers) {
    super();
    this.$root = $root;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("submit", (e) => {
      e.prevetDefault();
      console.log(e);
    });
  }
}

export default TimeForm;
