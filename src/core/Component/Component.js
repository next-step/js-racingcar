class Component {
  constructor(target, props, state = {}) {
    this.$target = target;
    this.$props = props;
    this.$state = state;

    this.initState(state);
    this.setEvent();
    this.render();
  }

  initState(newState) {
    this.$state = newState;
  }
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
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
