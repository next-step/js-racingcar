import Component from "../core/component.js";

// Props로 받을 것
// Car[] , Times

// Handler로 받을 것
// onClickReset

class RaceResult extends Component {
  constructor($root, props, handlers) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }
}

export default RaceResult;
