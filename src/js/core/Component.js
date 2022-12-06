export default class Component {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.state = {};
    this.props = props;
    this.mounted();
    this.setup();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  setup() {
    this.render();
    this.addEventListener();
  }

  mounted() {
    this.$target.innerHTML = this.template();
  }
  componentUpdated() {}
  render() {
    this.componentUpdated();
  }

  template() {
    return '';
  }

  addEventListener() {}
}
