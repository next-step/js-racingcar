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
    document.querySelector(hostElement).innerHTML = template;
  }

  insertHTML(hostElement, template = this.template, position = 'beforeend') {
    document.querySelector(hostElement).insertAdjacentHTML(position, template);
  }

  show(element) {
    document.querySelector(element).style.display = 'block';
  }

  hide(element) {
    document.querySelector(element).style.display = 'none';
  }
}
