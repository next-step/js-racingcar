import { withErrorHandling } from '../utils';

export default class View {
  constructor(target, model) {
    if (this.constructor === View) {
      throw new Error("추상 클래스로 인스턴스를 생성하였습니다.");
    }
    if (!target) throw new Error('target이 없습니다.');
    if (!model) throw new Error('model이 없습니다.');

    this.$target = target;
    this.model = model;
    this.setEvent();
    this.setInitialState();
  }
  setInitialState() {}

  setEvent() {}

  componentWillMount() {}

  render() {
    this.componentWillMount();
    if (this.$target.children.length !== 0) {
      this.$target.replaceChildren();
    }
    this.$target.insertAdjacentHTML('beforeend', this.getTemplate());
  }

  addEvent(eventType, selector, callback) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target) =>
      children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (ev) => {
      if (ev.target) {
        if (!isTarget(ev.target)) return;

        withErrorHandling(callback)(ev);
      }
    });
  }

  getTemplate() {
    throw new Error('추상 메서드는 오버라이딩이 필요합니다.');
  }
}
