export default class View {
  constructor(el) {
    if (!el) throw new Error(el);
    this.$target = el;
  }

  on(type, callback) {
    this.$target.addEventListener(type, callback);
    return this;
  }

  emit(type, data) {
    const event = new CustomEvent(type, data);
    this.$target.dispatchEvent(event);
    return this;
  }

  show() {
    this.$target.style.display = 'block';
    return this;
  }

  hide() {
    this.$target.style.display = 'none';
    return this;
  }
}
