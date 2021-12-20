class Component extends HTMLElement {
  template: string = '';
  state: any;
  props: any;

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = this.template;
  }

  onUpdate() {}

  setState(newState: any) {
    this.state = { ...this.state, ...newState };
    this.onUpdate();
  }

  setProps(newProps: any) {
    this.props = { ...this.props, ...newProps };
    this.onUpdate();
  }
}

export default Component;
