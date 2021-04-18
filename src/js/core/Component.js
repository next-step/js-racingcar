export default class Component {
  constructor($newtarget, newProps, tagName) {
    this.$target = null;
    this.selfProps = null;
    this.$self = document.createElement(tagName);
    this.children = [];
    this.render($newtarget, newProps);
    this.setEventLinstener();
  }
  selectPropsToUse() {
    this.selfProps = {};
  }
  getTemplate() {
    // 현 컴포넌트의 내부 html코드를 작성해서 return하세요.
  }
  mountComponents() {
    // createChildComponent 함수에 생성자, targetSelector, getPropsFunction을 인자로 전달해서 실행하세요.
  }
  componentDidMount() {}
  setEventLinstener() {
    //addEventLinstener를 사용해서 self에 이벤트를 위임하세요.
  }
  render($newTarget, newProps) {
    const isDiffTarget = this.isDiffTarget($newTarget);
    const isDiffProps = this.isDiffProps(newProps);
    if (!isDiffTarget && !isDiffProps) {
      this.reRenderChildren();
      return;
    }

    if (isDiffTarget) {
      this.$target = $newTarget;
      this.$target.appendChild(this.$self);
    }

    if (isDiffProps) {
      this.$self.innerHTML = this.getTemplate();
      this.children = [];
      this.mountComponents();
    }
    this.componentDidMount();
    this.reRenderChildren();
  }
  isDiffTarget($newTarget) {
    return this.$target !== $newTarget;
  }
  isDiffProps(newProps) {
    this.props = newProps;
    const prevProps = this.selfProps;
    this.selectPropsToUse();
    const nextProps = this.selfProps;
    return JSON.stringify(prevProps) !== JSON.stringify(nextProps);
  }

  createComponent(Constructor, targetSelector, getProps, tagName = "div") {
    const $target = this.$target.querySelector(targetSelector);
    const props = getProps();
    const component = new Constructor($target, props, tagName);
    this.addToChildren(targetSelector, getProps, component);
  }
  addToChildren(targetSelector, getProps, component) {
    this.children.push({ targetSelector, getProps, component });
  }
  reRenderChildren() {
    this.children.forEach(({ targetSelector, getProps, component }) => {
      const $target = this.$target.querySelector(targetSelector);
      component.render($target, getProps());
    });
  }
  addEventLinstener(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) => {
      return children.includes(target) || target.closest(selector);
    };
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target)) return false;
      callback(event);
    });
  }
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
