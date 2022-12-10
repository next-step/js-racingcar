export class Component {
  services;
  template;

  constructor(services) {
    this.services = services;
  }

  setEventListener(events = []) {
    if (!events.length) {
      return;
    }

    events.forEach(e => {
      const target = document.querySelector(e.target);

      target.addEventListener(e.event, e.handler);
    });
  }

  render(hostElement, template = this.template) {
    document.querySelector(hostElement).insertAdjacentHTML('beforeend', template);
  }

  show(element) {
    document.querySelector(element).classList.remove('hide');
  }

  hide(element) {
    document.querySelector(element).classList.add('hide');
  }
}
