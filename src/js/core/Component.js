import observer from '../core/observer.js';

export class Component {
  constructor({ $target, props = {} }) {
    this.$target = $target;
    this.state = {};
    this.props = props;
    this.setup();
  }

  setup() {
    this.state = observer.observable(this.state);

    observer.observe(() => {
      this.mounted();
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
