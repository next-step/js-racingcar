class Component {
  constructor($target, model) {
    this.$target = $target;
    this.model = model;
    this.model.subscribe(this.render.bind(this));
    this.addEventHandler();
    this.render();
  }

  addChangeEvent() {}

  addClickEvent() {}

  addSubmitEvent() {}

  addEventHandler() {
    this.$target.addEventListener('submit', (event) => {
      this.addSubmitEvent(event);
    });
    this.$target.addEventListener('click', (event) => {
      this.addClickEvent(event);
    });
    this.$target.addEventListener('change', (event) => {
      this.addChangeEvent(event);
    });
  }

  render() {}
}

export default Component;
