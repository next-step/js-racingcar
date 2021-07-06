export default class Component {
  $target;
  props;

  constructor($target, props) {
    this.$target = $target;
    this.props = props;
    this.setState();
    this.render();
    this.bindEvents();
  }

  render() {
    this.mount();
    this.mountChildren();
  }

  setState() {}

  bindEvents() {}

  mount() {}

  mountChildren() {}
}
