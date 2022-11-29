import observer from '../core/observer.js';

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
    observer.observe(() => {
      //*TODO: Component를 확장한 클래스 중 store의 state를 변경한 곳만 리렌더를 발생시켜야함.
      this.render();
      this.addEventListener();
    });
  }

  mounted() {
    this.$target.innerHTML = this.template();
  }

  render() {}

  template() {
    return '';
  }

  addEventListener() {}
}
