class View {
  rootElement = null;

  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  show() {
    this.rootElement.style.visibility = 'visible';
  }

  hide() {
    this.rootElement.style.visibility = 'hidden';
  }

  addEvent(element, type, callback) {
    const targetElement = this[element];
    if (!targetElement instanceof HTMLElement) {
      throw new Error(`element Name ${element} is not HTMLElement`);
    }

    this[element].addEventListener(type, callback);
  }

  init() {
    // override
  }
}

export { View };
