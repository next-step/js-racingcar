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

  onClick() {
    // override
    // Controller에서 model을 조작할 수 있도록 callback을 넣어준다.
    // 어디에 onClick을 달아줄 지는 View에서 알아서 담당한다.
    // parameter에서 object를 받아 여러 callback을 받으면 여러 callback을 적용할 수 있다.
  }

  initial() {
    // override
  }
}

export { View };
