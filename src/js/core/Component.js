export default class Component {
  constructor({ $target, props = {} }) {
    if (this.constructor == Component) {
      throw new Error('추상 클래스이므로 확장이 필요합니다.');
    }
    this.$target = $target;
    this.state = {};
    this.props = props;
    this.mount();
    this.render();
    this.addEventListener();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  mount() {
    this.$target.innerHTML = this.template();
  }

  render() {
    this.componentUpdated();
  }

  componentUpdated() {}

  template() {
    return '';
  }

  addEventListener() {}
}
