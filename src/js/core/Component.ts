type State = any;
type Props = any;

abstract class Component extends HTMLElement {
  template: string = '';
  state: State = {};
  props: Props = {};

  connectedCallback() {
    this.render();
    this.setElements();
    this.bindEvents();
  }

  render() {
    this.innerHTML = this.template;
  }

  onUpdate() {}

  setState(newState: State) {
    this.state = { ...this.state, ...newState };
    this.onUpdate();
  }

  setProps(newProps: Props) {
    this.props = { ...this.props, ...newProps };
    this.onUpdate();
  }

  bindEvents() {}

  setElements() {}
}

export default Component;
