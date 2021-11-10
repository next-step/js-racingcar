class Component {
  constructor(target, props = null, store = null) {
    this.$target = target;
    this.$props = props;
    this.$store = store;
    this.setup();
    this.setEvent();
    this.render();
  }
  setup() {}
  setEvent() {}
  template() {
    return '';
  }
  mounted() {}
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }
}

export default Component;
