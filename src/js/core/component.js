class Component {
  $root;
  $target;
  children;

  state;
  props;
  handlers;

  init() {}
  mountChildren() {}
  mount() {}
  setState() {}
  updateProps(nextProps) {
    this.props = nextProps;
    this.mount();
  }
  bindEvents() {}

  render() {
    this.init();
    this.mountChildren();
    this.mount();
    this.bindEvents();
  }
}

export default Component;
