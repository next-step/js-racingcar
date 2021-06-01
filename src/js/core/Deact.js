export default class Deact {
  constructor($target) {
    this.$target = $target;
    this.$self = document.createElement("div");
    this.props = null;
    this.children = [];
    this.createApp();
  }
  async createApp() {
    await this.setup();
    this.render();
    this.mountComponents();
  }
  async setup() {
    this.state = {};
    // state를 초기화하세요
    // 비동기 처리가 필요하면 await를 사용하세요.
    // ex
    // this.state = {
    //   sample: "sample",
    //   dd: "DD",
    //   pengdori: await getPendori(),
    //   raccoon: "raccoon",
    // };
  }
  setPropsFromState() {
    this.props = {};
    // app의 템플릿 생성에 필요한 props를 state에서 추출하세요.
    // ex
    // const {sample, dd} = this.state
    // this.props = {sample, dd}
  }
  getTemplate() {
    // 필요하다면 this.props를 사용해 최상위 컴포넌트의 target tag들을 template literal 형태로 반환하세요
    // ex
    // const {dd} = this.props
    //  return `<header class="header">${dd}</header>`
  }
  mountComponents() {
    // createComponent 메소드를 사용해서 컴포넌트를 생성하세요
    // ex
    // this.createComponent(Header, ".header", () => {
    //   const { dd, raccoon } = this.props;
    //   return {
    //     dd,
    //     raccoon,
    //   };
    // });
  }
  render() {
    if (this.shouldRender) {
      this.$self.innerHTML = this.getTemplate();
      this.$target.innerHTML = this.$self.innerHTML;
    }
    this.reRenderChildren();
  }

  get shouldRender() {
    const prevProps = this.props;
    this.setPropsFromState();
    const nextProps = this.props;
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
  updateState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
}
