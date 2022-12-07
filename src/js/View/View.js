import { withErrorHandling } from '../utils';

export default class View {
  constructor(target, model) {
    if (!target) throw new Error('target이 없습니다.');
    if (!model) throw new Error('model이 없습니다.');

    this.$target = target;
    this.model = model;
    this.setEvent();
    this.render();
  }

  setEvent() {}

  render() {
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
    return '';
  }
}
