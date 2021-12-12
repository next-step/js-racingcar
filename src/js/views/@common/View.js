class View {
  constructor($container) {
    if (!$container) {
      throw Error("유효하지 않은 container입니다.");
    }

    this.$container = $container;
  }

  render(innerHTML) {
    this.$container.insertAdjacentHTML("afterbegin", innerHTML);
  }

  show() {
    this.$container.style.display = "";
  }

  hide() {
    this.$container.style.display = "none";
  }

  on(eventName, handler) {
    this.$container.addEventListener(eventName, handler);
  }

  emit(eventName, data) {
    this.$container.dispatchEvent(new CustomEvent(eventName, { detail: data }));
  }
}

export default View;
