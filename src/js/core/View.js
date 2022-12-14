class View {
  rootElement = null;

  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  show() {
    this.rootElement.classList.remove('hide');
  }

  hide() {
    this.rootElement.classList.add('hide');
  }

  init() {
    // override
  }
}

export { View };
