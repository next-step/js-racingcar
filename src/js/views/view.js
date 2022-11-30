class View {
  constructor($target) {
    this.$target = $target;
    this.initEventHandler();
    this.render();
  }

  addChangeEvent() {}

  addClickEvent() {}

  addSubmitEvent() {}

  initEventHandler() {
    this.$target.addEventListener('submit', (event) => {
      this.addSubmitEvent(event);
    });
    this.view.$target.addEventListener('click', (event) => {
      this.addClickEvent(event);
    });
    this.view.$target.addEventListener('change', (event) => {
      this.addChangeEvent(event);
    });
  }

  render() {}
}

export default View;
