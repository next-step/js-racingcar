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
