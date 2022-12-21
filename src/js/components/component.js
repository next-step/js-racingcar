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

  render(element, template = this.template) {
    document.querySelector(element).innerHTML = template;
  }

  insertHTML(element, template = this.template, position = 'beforeend') {
    document.querySelector(element).insertAdjacentHTML(position, template);
  }

  removeHTML(element) {
    document.querySelector(element).remove();
  }

  show(element) {
    document.querySelector(element).style.display = 'block';
  }

  hide(element) {
    document.querySelector(element).style.display = 'none';
  }

  getChildCount(element) {
    return document.querySelector(element).childElementCount;
  }

  displayAlert(message) {
    window.alert(message);
  }
}
